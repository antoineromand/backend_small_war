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
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(ResultGame)
    private resultGameRepository: Repository<ResultGame>,
  ) {}
  async newGame(players: Player[]): Promise<Game> {
    players.forEach(async (element) => {
      const player = await this.playerRepository.findOne({
        where: { username: element.username },
      });
      if (player !== null) {
        return null;
      }
    });
    const game = new Game();
    game.game_start = new Date();
    game.game_end = null;
    game.players = players;
    game.result = null;
    return await this.gameRepository.save(game);
  }

  async playerResult(player: Player, result: string): Promise<Player> {
    player.statistic.games++;
    switch (result) {
      case 'win':
        player.statistic.win++;
        break;
      case 'loose':
        player.statistic.loose++;
        break;
    }
    return await this.playerRepository.save(player);
  }

  async endGame(gameId: string, winner: Player, looser: Player): Promise<Game> {
    const result = new ResultGame();
    const game = await this.gameRepository.findOne({
      where: { game_id: gameId },
    });
    result.game = game;
    result.winner = winner;
    this.playerResult(winner, 'win');
    result.looser = looser;
    this.playerResult(looser, 'loose');
    this.resultGameRepository.save(result);
    game.result = result;
    game.game_end = new Date();
    return await this.gameRepository.save(game);
  }
}
