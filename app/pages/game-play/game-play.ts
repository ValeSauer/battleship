import {Page} from 'ionic-angular';
import {NavParams} from "../../../node_modules/ionic-angular/components/nav/nav-params";


@Page({
    templateUrl: 'build/pages/game-play/game-play.html',
})
export class GamePlay {

    constructor(private params:NavParams) {
        console.log(params);
    }

}
