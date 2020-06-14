import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpDto, SignInDto, LoggedInDto } from './dto';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'User registration' })
  @ApiBody({ type: SignUpDto })
  @UsePipes(ValidationPipe)
  signup(@Body() signUpDto: SignUpDto): Promise<void> {
    return this._authService.signup(signUpDto);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'User login' })
  @ApiBody({ type: SignInDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UsePipes(ValidationPipe)
  signin(@Body() signInDto: SignInDto): Promise<LoggedInDto> {
    return this._authService.signin(signInDto);
  }
}
