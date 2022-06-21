import { Game } from './Game.entity';
import { PlayerStatistic } from './PlayerStatistic.entity';
export declare class Player {
    player_id: number;
    games: Game[];
    statistic: PlayerStatistic;
    username: string;
    password: string;
    email: string;
    winner: Player;
    looser: Player;
}
