import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game } from 'src/Model/Game.entity';
import { ResultGame } from 'src/Model/ResultGame.entity';
import { Player } from 'src/Model/Player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Game, ResultGame, Player])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
