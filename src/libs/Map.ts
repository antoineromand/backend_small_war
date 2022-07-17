export class Map {
  private width: number;
  private heigth: number;
  constructor(height: number, width: number) {
    this.heigth = height;
    this.width = width;
  }

  public get mapWidth(): number {
    return this.width;
  }

  public set mapWidth(width: number) {
    this.width = width;
  }

  public get mapHeight(): number {
    return this.heigth;
  }

  public set mapHeight(height: number) {
    this.heigth = height;
  }

  public getMap() {
    return { width: this.mapWidth, height: this.heigth };
  }
}