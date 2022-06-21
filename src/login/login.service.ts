import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';
import { DeepPartial, InsertResult, ObjectLiteral, Repository } from 'typeorm';
import { LoginDTO } from './dto/Login.dto';
import { RegisterDTO } from './dto/Register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(PlayerStatistic)
    private playerStatisticsRepository: Repository<PlayerStatistic>,
  ) {}

  async login(userLoginInfo: LoginDTO): Promise<Player> {
    const user = await this.playerRepository.findOne({
      where: { username: userLoginInfo.username },
    });
    if (user === undefined || user === null) {
      throw new HttpException('Pseudo incorrecte !', HttpStatus.BAD_REQUEST);
    } else {
      const isPasswordMatching = await bcrypt.compare(
        userLoginInfo.password,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Mauvais mot de passe !',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    }
  }

  async register(user: RegisterDTO): Promise<ObjectLiteral> {
    const userExist = await this.playerRepository.findOne({
      where: { username: user.username },
    });
    const emailExist = await this.playerRepository.findOne({
      where: { email: user.email },
    });
    if (userExist !== null && emailExist !== null) {
      console.log('ça existe ??');
      throw new HttpException(
        'Pseudo ou email déja choisi !',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const idStats = await (
        await this.initStats()
      ).generatedMaps[0].player_statistic_id;
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.playerRepository
        .createQueryBuilder()
        .insert()
        .into(Player)
        .values({
          username: user.username,
          email: user.email,
          password: hashedPassword,
          statistic: idStats,
        })
        .execute();
      return newUser.generatedMaps[0];
    }
  }

  async initStats() {
    return await this.playerStatisticsRepository
      .createQueryBuilder()
      .insert()
      .into(PlayerStatistic)
      .values({})
      .execute();
  }
}
