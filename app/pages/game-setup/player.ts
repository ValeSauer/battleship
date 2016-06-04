/**
 * Created by valentin.sauer on 30.05.2016.
 */
import {Ship} from '../game-setup/ship.ts';
import {IPlayer} from '../game-setup/IPlayer.ts';

export class Player implements IPlayer {
    id:number;
    ships:Array<Ship> = [];

    constructor(id:number) {
        this.id = id;

        for (let i = 0; i < 10; i++) {
            this.ships.push(new Ship(0,i,2));
            this.ships.push(new Ship(0,i,2));
            this.ships.push(new Ship(0,i,2));
            this.ships.push(new Ship(0,i,2));
            this.ships.push(new Ship(0,i,3));
            this.ships.push(new Ship(0,i,3));
            this.ships.push(new Ship(0,i,3));
            this.ships.push(new Ship(0,i,4));
            this.ships.push(new Ship(0,i,4));
            this.ships.push(new Ship(0,i,5));
        }

    }
}