/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { RegisterDTO } from './dto/Register.dto';
import { LoginService } from './login.service';

@Controller('private/api/auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('login')
  async login(@Body() user: LoginDTO) {
    return this.loginService.login(user);
  }
  @Post('register')
  async register(@Body() user: RegisterDTO) {
    return this.loginService.register(user);
  }
}
