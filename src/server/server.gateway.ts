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
import { Map } from '../libs/Map';

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

  @SubscribeMessage('login')
  handleEvent(
    @MessageBody() player: Player,
  ) {
    const isConnected = this.players.find(
      (player) => player.player_id === player.player_id,
    );
    if (isConnected === undefined) {
      this.players.push(player);
    } else {
      return null;
    }
  }

  handleDisconnect(player: Player) {
    this.players = this.players.filter((pl) => pl.player_id === player.player_id);
    if(this.playersInGame.includes(player)) this.playersInGame = this.playersInGame.filter((pl) => pl.player_id === player.player_id);
  }

  @SubscribeMessage('matchmaking')
  async joining_game(@MessageBody() player: Player) {
    this.playersInGame.push(player);
  }
}
