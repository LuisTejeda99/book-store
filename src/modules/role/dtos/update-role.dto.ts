import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50, { message: 'this name is not valid' })
  readonly name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100, { message: 'this description is not valid' })
  readonly description: string;
}
