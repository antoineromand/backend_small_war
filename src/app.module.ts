import { TypeormConfigModule } from './database/typeormConfig.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './player/player.module';
import { AuthModule } from './auth/auth.module';
import { ServerModule } from './server/server.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    TypeormConfigModule,
    ConfigModule.forRoot(),
    PlayerModule,
    AuthModule,
    ServerModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
