import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { RegisterDTO } from './dto/Register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(PlayerStatistic)
    private playerStatisticsRepository: Repository<PlayerStatistic>,
  ) {}

  async findPlayerByUsername(username_player: string): Promise<Player> {
    return this.playerRepository.findOne({
      where: { username: username_player },
    });
  }

  async register(user: RegisterDTO): Promise<Player> {
    const userExist = await this.playerRepository.findOne({
      where: { username: user.username },
    });
    const emailExist = await this.playerRepository.findOne({
      where: { email: user.email },
    });
    if (userExist !== null && emailExist !== null) {
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
      const registeredUser = await this.playerRepository.findOne({
        where: { username: user.username },
      });
      registeredUser.password = undefined;
      return registeredUser;
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
