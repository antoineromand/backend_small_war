/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Headers } from '@nestjs/common';
import { RegisterDTO } from './dto/Register.dto';
import { PlayerService } from './player.service';
import * as tokenLib from 'src/libs/token';
import { UpdateDto } from './dto/Update.dto';

@Controller('private/api/player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('register')
  async register(@Body() user: RegisterDTO) {
    return this.playerService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserInfo(@Headers() headers) {
    const token = tokenLib.extractToken(headers.authorization);
    return this.playerService.getPlayerInfo(token.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/update/username')
  async updatePlayerUsername(@Headers() headers, @Body() userInfo: UpdateDto) {
    const token = tokenLib.extractToken(headers.authorization);
    return this.playerService.updatePlayerUsername(
      token.userId,
      userInfo.username,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('/update/password')
  async updatePlayerPassword(@Headers() headers, @Body() userInfo: UpdateDto) {
    const token = tokenLib.extractToken(headers.authorization);
    return this.playerService.updateUserPassword(
      token.userId,
      userInfo.password,
    );
  }
}
