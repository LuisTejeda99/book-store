import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDto } from '../../user/dtos';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadBookDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  readonly description: string;

  @Expose()
  @ApiProperty()
  @Type(type => ReadUserDto)
  readonly authors: ReadUserDto[];
}
