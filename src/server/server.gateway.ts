import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ServerService } from './server.service';
import { Server } from 'socket.io';
import { Player } from 'src/Model/Player.entity';
import { GameService } from 'src/game/game.service';
import { GameInfos, PlayerGameInfos, posDown, posUp } from 'src/libs/player';

@WebSocketGateway()
export class ServerGateway {
  constructor(
    private readonly serverService: ServerService,
    private gameService: GameService,
  ) {}

  @WebSocketServer()
  server: Server;
  players: Player[] = [];
  playersInGame: Player[] = [];
  @SubscribeMessage('search_game')
  login(@MessageBody() data: Player) {
    this.players.push(data);
    console.log(this.players);
  }

  @SubscribeMessage('create_game')
  async matchmaking(@MessageBody() gameInfos: GameInfos) {
    if (this.players.length > 1) {
      let p2: Player =
        this.players[Math.floor(Math.random() * this.players.length)];
      if (
        this.playersInGame.includes(p2) &&
        this.playersInGame.includes(gameInfos.player)
      ) {
        //Si le player2 est déjà dans une game (et également le player 1), relancer la fonction jusqu'à que le player 2 ne soit pas un player dans une game.
        this.matchmaking(gameInfos);
      } else {
        this.playersInGame.push(gameInfos.player, p2);
        const game = await this.gameService.newGame([gameInfos.player, p2]);
        //Je transmet la partie
        console.log(game);
        this.server.emit('game_start', game);
        //Je génère les positions des bases (à définir avec marin je pense plus précisement)
        const up = posUp(gameInfos.map.width, gameInfos.map.height);
        const down = posDown(gameInfos.map.width, gameInfos.map.height);
        //Je pcik up ou down à une variable au hasard
        const chosenValue = Math.random() * 2 ? up : down;
        let otherValue;
        //J'attribue à une autre valeur la const qui n'a pas été pick par chosenValue
        chosenValue === up ? (otherValue = down) : (otherValue = up);
        //Je transmet les informations de la game qui contiennent les deux joueurs et les position de leurs bases.
        const gameData: PlayerGameInfos[] = [
          { player: gameInfos.player, position: chosenValue },
          { player: p2, position: otherValue },
        ];
        console.log(gameData);
        this.server.emit('game_infos', gameData);
      }
    } else {
      return 'Pas assez de joueurs !';
    }
  }
}
