import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReadBookDto, CreateBookDto, UpdateBookDto } from './dtos';
import { BookService } from './book.service';
import { RoleType } from '../role/roletype.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorators/role.decorator';
import { GetUser } from '../auth/user.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}
  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number): Promise<ReadBookDto> {
    return this._bookService.getById(id);
  }

  @Get('author/:authorId')
  getBooksByAuthor(
    @Param('authorId', ParseIntPipe) authorId: number,
  ): Promise<ReadBookDto[]> {
    return this._bookService.getBooksByAuthor(authorId);
  }

  @Get()
  getBooks(): Promise<ReadBookDto[]> {
    return this._bookService.getAll();
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBook(@Body() book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    return this._bookService.create(book);
  }

  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  createBookByAuthor(
    @Body() book: Partial<CreateBookDto>,
    @GetUser('id') authorId: number,
  ): Promise<ReadBookDto> {
    return this._bookService.createByAuthor(book, authorId);
  }

  @Patch(':bookId')
  updateBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() book: Partial<UpdateBookDto>,
    @GetUser('id') authorId: number,
  ) {
    return this._bookService.update(bookId, book, authorId);
  }

  @Delete('id')
  deleteBook(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._bookService.delete(id);
  }
}
