import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerGateway } from './server.gateway';
import { GameModule } from 'src/game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';

@Module({
  providers: [ServerGateway, ServerService],
  imports: [GameModule, TypeOrmModule.forFeature([Player, PlayerStatistic])],
})
export class ServerModule {}
