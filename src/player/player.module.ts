import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerStatistic])],
  providers: [PlayerService],
  controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}
