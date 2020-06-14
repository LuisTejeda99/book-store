import { IsNumber, IsString, IsEmail } from 'class-validator';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dtos/read-role.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadUserDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @Expose()
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @Expose()
  @ApiProperty()
  @IsString()
  readonly username: string;

  @Expose()
  @ApiProperty()
  @Type(type => ReadUserDetailsDto)
  readonly details: ReadUserDetailsDto;

  @Expose()
  @ApiProperty()
  @Type(type => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
