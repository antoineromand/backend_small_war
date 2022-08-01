import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Player } from 'src/Model/Player.entity';
import { AdminService } from './admin.service';
import { Socket } from 'socket.io';

@Controller('private/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Get('players')
  async getPlayers(): Promise<Player[]>  {
    return await this.adminService.getPlayers();
  }

  @Delete('players/:id')
  async deletePlayerAccount(@Param('id') id: string) {
    return await this.adminService.deletePlayerAccount(id);
  }

  @Get('games')
  async getGames() {
    return await this.adminService.getGames();
  }

  @Get('games/online')
  async getActualsGames() {
    return await this.adminService.getGames('online');
  }
}
