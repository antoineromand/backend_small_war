type Localisation = {
  posX: number;
  posY: number;
  posZ: number;
};

export class Entity {
  private _name: string;
  private _posX: number;
  private _posY: number;
  private _posZ: number;

  constructor(name: string, posX: number, posY: number) {
    this._name = name;
    this._posX = posX;
    this._posY = posY;
    this._posZ = 0;
  }

  get name(): string {
    return this._name;
  }
  get postion(): Localisation {
    return {
      posX: this._posX,
      posY: this._posY,
      posZ: this._posZ,
    };
  }
  set name(name: string) {
    this._name = name;
  }

  set posX(posX: number) {
    this._posX = posX;
  }
  set posY(posY: number) {
    this._posY = posY;
  }
  set posZ(posZ: number) {
    this._posZ = posZ;
  }
}
