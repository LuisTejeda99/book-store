import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadUserDetailsDto {
  @Expose()
  @ApiProperty()
  @IsString()
  readonly name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  readonly lastname: string;
}
