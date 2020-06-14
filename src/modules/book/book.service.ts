import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { UserRepository } from '../user/user.repository';
import { ReadBookDto } from './dtos/read-book.dto';
import { plainToClass } from 'class-transformer';
import { Book } from './book.entity';
import { In } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dtos';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getById(bookId: number): Promise<ReadBookDto> {
    if (!bookId) {
      throw new BadRequestException('book id must be sent');
    }

    const book: Book = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!book) {
      throw new NotFoundException('book does not exist');
    }

    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const books: Book[] = await this._bookRepository.find({
      where: { status: 'ACTIVE' },
    });
    return books.map(book => plainToClass(ReadBookDto, book));
  }

  async getBooksByAuthor(authorId: number): Promise<ReadBookDto[]> {
    if (!authorId) {
      throw new NotFoundException('author id must be sent');
    }

    const books: Book[] = await this._bookRepository.find({
      where: { status: 'ACTIVE', authors: In([authorId]) },
    });

    return books.map(book => plainToClass(ReadBookDto, book));
  }

  async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: User[] = [];
    for (const authorId of book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: 'ACTIVE' },
      });

      if (!authorExists) {
        throw new NotFoundException(
          'there is not an author with this Id: ${authorId}',
        );
      }

      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new UnauthorizedException(
          'this user ${authorId} is not an author',
        );
      }

      authors.push(authorExists);
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async createByAuthor(book: Partial<CreateBookDto>, authorId: number) {
    const author = await this._userRepository.findOne(authorId, {
      where: { status: 'INACTIVE' },
    });

    const isAuthor = author.roles.some(
      (role: Role) => role.name === RoleType.AUTHOR,
    );

    if (!isAuthor) {
      throw new UnauthorizedException('this user ${authorId} is not an author');
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      author,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async update(bookId: number, book: Partial<UpdateBookDto>, authorId: number) {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new UnauthorizedException('this book does not exist');
    }

    const isOwnBook = bookExists.authors.some(author => authorId === authorId);
    if (!isOwnBook) {
      throw new UnauthorizedException(
        'this user is not the author of the book',
      );
    }

    bookExists.name = book.name;
    bookExists.description = book.description;

    const updatedBook = await this._bookRepository.update(bookId, bookExists);
    return plainToClass(ReadBookDto, updatedBook);
  }

  async delete(bookId: number): Promise<void> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new NotFoundException('this book does not exist');
    }

    await this._bookRepository.update(bookId, { status: 'INACTIVE' });
  }
}
