import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/Model/Game.entity';
import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(PlayerStatistic) private playerStatisticsRepository: Repository<PlayerStatistic>,
    @InjectRepository(Game) private gameRepository: Repository<Game>
    ) {}

    async getPlayers() : Promise<Player[]> {
        const players = await this.playerRepository.createQueryBuilder('player').leftJoinAndSelect('player.statistic', 'player_statistic').getMany();
        return players;
    }

    async deletePlayerAccount(idAccount: string): Promise<any> {
        try {
            const player = await this.playerRepository.createQueryBuilder('player').leftJoinAndSelect('player.statistic', 'player_statistic').where('player.player_id = :id', {id: idAccount}).getOne();
            const statistic_id = await player.statistic.player_statistic_id;
            //player.statistic = null;
            //await this.playerRepository.save(player);
            const stats = await this.playerStatisticsRepository.findOne({where:{player_statistic_id: statistic_id}})
            await this.playerRepository.delete(player);
            await this.playerStatisticsRepository.delete(stats);
            return { success: true, message: 'Player and his statistics were deleted !'}
        } catch (e) {
            throw new Error(e);
        } 
    }
}
