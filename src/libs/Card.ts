import { Player } from "src/Model/Player.entity";

export type CardPos = {
    x: number;
    y: number;
}

export enum CardAction {
    movement = 'MOVEMENT',
    attack = 'ATTACK',
    recolt = 'RECOLT',
    invoke = 'INVOKE'
}

export class Card {
  private name: string;
  private owner: Player;
  private pos: CardPos;
  private action: CardAction;
  constructor(name: string, owner: Player, pos: CardPos, action: CardAction) {
    this.name = name;
    this.owner = owner;
    this.pos = pos;
    this.action = action;
  }

  public get cardName(): string {
    return this.name;
  }

  public set cardName(name: string) {
    this.name = name;
  }

  public get cardOwner(): Player {
    return this.owner;
  }

  public set cardOwner(player: Player) {
    this.owner = player;
  }

  public get cardPos(): CardPos {
    return this.pos;
  }

  public set cardPos(pos: CardPos) {
    this.pos = pos;
  }

  public get cardAction(): CardAction {
    return this.action;
  }

  public set cardAction(action: CardAction) {
    this.action = action;
  }
}