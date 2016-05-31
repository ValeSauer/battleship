/**
 * Created by valentin.sauer on 30.05.2016.
 */
export class Game {
    currentPlayer: number;

    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.orientation = 'horizontal';
    }
}