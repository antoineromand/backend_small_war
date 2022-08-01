import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';
import { Game } from 'src/Model/Game.entity';
import { ResultGame } from 'src/Model/ResultGame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerStatistic, Game, ResultGame])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
