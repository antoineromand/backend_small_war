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

  async getPlayerInfo(id: string): Promise<Player> {
    const user = await this.playerRepository.findOne({
      where: { player_id: id },
    });
    user.password = undefined;
    return user;
  }

  async updatePlayerUsername(id: string, username: string) {
    const findUsername = await this.playerRepository.findOne({
      where: { username: username },
    });
    if (findUsername !== null) {
      throw new HttpException('Pseudo déjà choisi !', HttpStatus.BAD_REQUEST);
    }
    const user = await this.getPlayerInfo(id);
    if (user.username === username) {
      throw new HttpException(
        'Le pseudo saisi est le même que votre pseudo actuel !',
        HttpStatus.BAD_REQUEST,
      );
    }
    const oldUsername = user.username;
    user.username = username;
    this.playerRepository.save(user);
    return `Le joueur ${oldUsername} a changé son pseudo avec le suivant : ${username}`;
  }

  async updateUserPassword(id: string, password: string) {
    const user = await this.getPlayerInfo(id);
    if (user.password === password) {
      throw new HttpException(
        'Le mot de passe saisie est le même que votre mot de passe actuel ! Changez le !',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = await bcrypt.hash(password, 10);
    this.playerRepository.save(user);
    return `Le joueur ${user.username} a changé son mot de passe !`;
  }
}
