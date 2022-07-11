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
      host: process.env.SW_HOST_PROD,
      port: parseInt(process.env.SW_PORT),
      username: process.env.SW_ADMIN_PROD,
      password: process.env.SW_PASSWORD_PROD,
      database: process.env.SW_DATABASE_PROD,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
  }
}
