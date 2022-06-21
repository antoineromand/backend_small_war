/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './typeormconfig.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
  ],
  controllers: [],
  providers: [TypeormConfigService],
})
export class TypeormConfigModule {}
