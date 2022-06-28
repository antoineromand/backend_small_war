import { Player } from 'src/Model/Player.entity';

export type BasePosition = {
  posX: number;
  posY: number;
};

export type PlayerGameInfos = {
  player: Player;
  position: BasePosition;
};

export type Map = {
  width: number;
  height: number;
};

export type GameInfos = {
  player: Player;
  map: Map;
};

export const posUp = (width: number, height: number): BasePosition => {
  return {
    posX: width / 2,
    posY: 0,
  };
};

export const posDown = (width: number, height: number): BasePosition => {
  return {
    posX: width / 2,
    posY: height,
  };
};
