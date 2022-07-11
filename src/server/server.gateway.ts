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
import { isInGame } from 'src/libs/game';

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
    const isConnected = this.players.find(
      (player) => player.player_id === data.player_id,
    );
    if (isConnected === undefined) {
      this.players.push(data);
    } else {
      return null;
    }
  }

  @SubscribeMessage('join_game')
  async joining_game(@MessageBody() player: Player) {
    this.serverService.joinGame(player);
  }
}
