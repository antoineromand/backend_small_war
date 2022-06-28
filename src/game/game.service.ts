import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/Model/Game.entity';
import { Player } from 'src/Model/Player.entity';
import { ResultGame } from 'src/Model/ResultGame.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(ResultGame)
    private resultGameRepository: Repository<ResultGame>,
  ) {}
  async newGame(players: Player[]) {
    const game = new Game();
    game.game_start = new Date();
    game.game_end = null;
    game.players = players;
    game.result = null;
    return this.gameRepository.save(game);
  }

  async endGame(gameId: number, winner: Player, looser: Player) {
    const result = new ResultGame();
    const game = await this.gameRepository.findOne({
      where: { game_id: gameId },
    });
    result.game = game;
    result.winner = winner;
    result.looser = looser;
    this.resultGameRepository.save(result);
    game.result = result;
    game.game_end = new Date();
    this.gameRepository.save(game);
  }
}
