import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Player } from 'src/Model/Player.entity';
import { AdminService } from './admin.service';

@Controller('private/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('players')
  async getPlayer(): Promise<Player[]>  {
    return await this.adminService.getPlayers();
  }

  @Delete('players/:id')
  async deletePlayerAccount(@Param('id') id: string) {
    return await this.adminService.deletePlayerAccount(id);
  }
}
