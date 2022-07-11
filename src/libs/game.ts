import { Game } from 'src/Model/Game.entity';
import { Player } from 'src/Model/Player.entity';

export type Map = {
  width: number;
  height: number;
};

export type GameInfos = {
  player: Player[];
  game: Game;
  map: Map;
};

export const isInGame = (player: Player, players: Player[]) => {
  const isConnected = players.find(
    (player) => player.player_id === player.player_id,
  );
  if (isConnected === undefined) return player;
};
