/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { RegisterDTO } from './dto/Register.dto';
import { PlayerService } from './player.service';

@Controller('private/api/player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('register')
  async register(@Body() user: RegisterDTO) {
    return this.playerService.register(user);
  }
}
