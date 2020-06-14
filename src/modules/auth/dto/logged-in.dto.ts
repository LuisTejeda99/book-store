import { IsString } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
import { type } from 'os';
import { ReadUserDto } from '../../user/dtos';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class LoggedInDto {
  @ApiProperty()
  @Expose()
  @IsString()
  token: string;

  @ApiProperty()
  @Expose()
  @Type(() => ReadUserDto)
  user: ReadUserDto;
}
