import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { GameInfos, Map, isInGame } from 'src/libs/game';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
import { GameService } from 'src/game/game.service';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    private gameService: GameService,
  ) {}

  server: Server;

  async verifyUserExist(pl: Player) {
    const player = this.playerRepository.findOne({
      where: { player_id: pl.player_id },
    });
    console.log(await player);
    if ((await player) === null && (await player) === undefined) {
      return null;
    } else {
      return await player;
    }
  }
  async joinGame(player: Player) {
    if (await this.verifyUserExist(player)) {
      this.server.on('looking_for_player', async (player2: Player) => {
        const game = await this.gameService.newGame([player, player2]);
        this.server.on('map', (map: Map) => {
          const infos: GameInfos = {
            player: [player, player2],
            map: map,
            game: game,
          };
          return infos;
        });
      });
    }
  }

  async createGame(player: Player, players: Player[]) {
    if ((await this.verifyUserExist(player)) !== null) {
      this.server.on('looking_for_game', async (player2: Player) => {
        if (player2 === undefined) this.createGame(player, players);
        if (isInGame(player2, players)) this.createGame(player, players);
        const game = await this.gameService.newGame([player, player2]);
        this.server.on('map', (map: Map) => {
          const infos: GameInfos = {
            player: [player, player2],
            map: map,
            game: game,
          };
          return infos;
        });
      });
    }
    return null;
  }
}
