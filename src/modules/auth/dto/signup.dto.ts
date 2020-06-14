import { IsNotEmpty, isString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
  @ApiProperty({ type: String, description: 'username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
