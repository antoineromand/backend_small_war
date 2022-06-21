import { Game } from './Game.entity';
import { Player } from './Player.entity';
export declare class ResultGame {
    id_result_game: number;
    game: Game;
    winner: Player;
    looser: Player;
}
