/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.SW_HOST,
      port: parseInt(process.env.SW_PORT),
      username: process.env.SW_ADMIN,
      password: process.env.SW_PASSWORD,
      database: process.env.SW_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
  }
}
