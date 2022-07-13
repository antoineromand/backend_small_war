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

    get cardName(): string {
        return this.name;
    }

    set cardName(name: string) {
        this.name = name;
    }

    get cardOwner(): Player {
        return this.owner;
    }

    set cardOwner(player: Player) {
        this.owner = player;
    }

    get cardPos(): CardPos {
        return this.pos;
    }

    set cardPos(pos: CardPos) {
        this.pos = pos;
    }

    get cardAction() {
        return this.action;
    }

    set cardAction(action: CardAction) {
        this.action = action;
    }
}