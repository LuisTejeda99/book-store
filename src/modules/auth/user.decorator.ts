import { createParamDecorator } from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';

export const GetUser = createParamDecorator((key, req) =>
  key ? req.user[key] : req.user,
);
