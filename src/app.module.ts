import { TypeormConfigModule } from './database/typeormConfig.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './player/player.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeormConfigModule,
    ConfigModule.forRoot(),
    PlayerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
