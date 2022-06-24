import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDTO } from 'src/player/dto/Login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('private/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDTO) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test() {
    return 'ceci est un exercice !';
  }
}
