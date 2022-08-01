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
import { InfoServer } from 'src/libs/InfoServer';

@WebSocketGateway()
export class ServerGateway {
  constructor(
    private readonly serverService: ServerService,
    private gameService: GameService,
  ) {}

  @WebSocketServer()
  server: Server;
  players: Player[] = [];
  matchmaking_players: Player[] = [];
  rooms: any[] = [];

  @SubscribeMessage('admin/players')
  getPlayersOnLine(): Player[] {
    return this.players;
  }

  @SubscribeMessage('login')
  handleEvent(@MessageBody() player: Player): InfoServer {
    const isConnected = this.players.find(
      (player) => player.player_id === player.player_id,
    );
    if (isConnected === undefined) {
      this.players.push(player);
      const infoServer = new InfoServer(
        true,
        'You have been logged succefully !',
      );
      return infoServer;
    } else {
      return new InfoServer(false, 'Error, you have not the permission !');
    }
  }

  handleDisconnect(player: Player) {
    this.players = this.players.filter(
      (pl) => pl.player_id === player.player_id,
    );
    if (this.matchmaking_players.includes(player))
      this.matchmaking_players = this.matchmaking_players.filter(
        (pl) => pl.player_id === player.player_id,
      );
  }

  @SubscribeMessage('matchmaking')
  async joining_game(@MessageBody() player: Player) {
    if (!this.matchmaking_players.includes(player)) return;
    this.matchmaking_players.push(player);
  }
}
