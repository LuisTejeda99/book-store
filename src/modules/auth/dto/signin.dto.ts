import { IsNotEmpty, isString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignInDto {
  @ApiProperty({ type: String, description: 'username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
