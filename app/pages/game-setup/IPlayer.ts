/**
 * Created by valentin.sauer on 30.05.2016.
 */
import {Ship} from '../game-setup/ship.ts';

export interface IPlayer {
    id:number;
    ai:boolean;
    ships:Array<Ship>;
}
