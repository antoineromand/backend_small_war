import { TypeormConfigModule } from './database/typeormConfig.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';

@Module({
  imports: [TypeormConfigModule, ConfigModule.forRoot(), LoginModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
