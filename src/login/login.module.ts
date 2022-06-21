import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerStatistic])],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
