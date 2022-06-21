import { Player } from './Player.entity';
import { ResultGame } from './ResultGame.entity';
export declare class Game {
    game_id: number;
    players: Player[];
    result: ResultGame;
    game_start: Date;
    game_end: Date;
}
