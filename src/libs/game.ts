import { Game } from 'src/Model/Game.entity';
import { Player } from 'src/Model/Player.entity';

export type Map = {
  width: number;
  height: number;
};

export type Pos = {
  posX: number;
  posY: number;
}

export type GameInfos = {
  player: Player[];
  game: Game;
  map: Map;
  cards: CardEntity[];
};

export type ActionPlayer = {
  player: Player;
  type: string;
  card: CardEntity;
}

export type CardEntity = {
  name: string;
  hp: number;
  pos: Pos;
}

export const isInGame = (player: Player, players: Player[]): Player => {
  const isConnected = players.find(
    (player) => player.player_id === player.player_id,
  );
  if (isConnected === undefined) return player;
};
