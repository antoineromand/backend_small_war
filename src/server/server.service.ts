import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/Model/Player.entity';
import { GameInfos, Map, isInGame } from 'src/libs/game';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/game/game.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    private gameService: GameService,
  ) {}

  server: Server;

  async userExist(pl: Player) {
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

  async searchGame(player: Player, rooms: any[], socket: Socket) {
    if(rooms.length === 0) {
      const idRoom = randomUUID();
      socket.join(idRoom);
    } else  {
      let room = rooms[Math.floor(Math.random() * rooms.length)];
      room.player === 1 ? socket.join(room.id) :  this.searchGame(player, rooms, socket);     
    }
  }
  
}
