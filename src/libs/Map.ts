export class Map {
    private width: number;
    private heigth: number;
    constructor(height: number, width: number) {
        this.heigth = height;
        this.width = width;
    }

    get mapWidth(): number {
        return this.width;
    }

    set mapWidth(width: number) {
        this.width = width;
    }

    get mapHeight(): number {
        return this.heigth;
    }

    set mapHeight(height: number) {
        this.heigth = height;
    }

}