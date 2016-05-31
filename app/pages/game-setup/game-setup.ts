import {Page, NavController} from 'ionic-angular';
import {GamePlay} from '../game-play/game-play';
import {Player} from '../game-setup/player.ts';
import {Ship} from '../game-setup/ship.ts';
import * as interact from 'interact.js';
import {IPlayer} from "./IPlayer";


@Page({
    templateUrl: 'build/pages/game-setup/game-setup.html'
})
export class GameSetup {

    cells:Array<number> = [];
    x:number = 10;
    y:number = 10;

    players:Array<IPlayer> = [new Player(1, false), new Player(2, true)];

    static originX:number;
    static originY:number;
    static cellSize:number;
    currentPlayer:Player = this.players[0];

    constructor(private nav:NavController) {
        for (let i = 0; i < this.x * this.y; i++) {
            this.cells.push(i);
        }
    }

    startGame() {

        let shipElements = document.getElementsByClassName('ship');
        let ships = [];

        for (let i = 0; i < shipElements.length; i++) {
            let shipElement = shipElements.item(i);
            let ship = {
                x: parseInt(shipElement.getAttribute('data-x')),
                y: parseInt(shipElement.getAttribute('data-y')),
                type: shipElement.getAttribute('data-type'),
                orientation: shipElement.classList.contains('rotate') ? 'vertical' : 'horizontal'
            }

            ships.push(ship);
        }

        this.nav.push(GamePlay, {
            ships: ships
        });
    }

    moveAllowed(newX:number, newY:number, ship:HTMLElement):boolean {
        for (let i = 0; i < ship.getAttribute('data-type'); i++) {
            if (newX > 9 || newX < 0 || newY > 9 || newY < 0) {
                return false;
            }
            for (var checkship of document.getElementsByClassName('ship')) {
                if (newX == checkship.getAttribute('data-x') && newY == checkship.getAttribute('data-y') && ship != checkship) {
                    return false;
                }
            }

            if (ship.getAttribute('data-orientation') == 'horizontal') {
                newX++;
            } else {
                newY++
            }
        }
        return true;
    }

    ngAfterContentInit() {

        let game = document.getElementById('game');
        game.style.height = game.clientWidth + 'px';

        GameSetup.cellSize = game.clientWidth / 10;
        GameSetup.originX = game.getClientRects()[0].left;
        GameSetup.originY = game.getClientRects()[0].top;

        for (var ship of this.currentPlayer.ships){
            //ship.render();
        }

        interact('.ship')
            .draggable({
                relativePoints: [
                    {x: 0, y: 0}   // snap relative to the element's top-left,
                ],
                restrict: {
                    restriction: 'parent',
                    elementRect: {top: 0, left: 0, bottom: 1, right: 1},
                    endOnly: true
                },
                snap: {
                    targets: [
                        interact.createSnapGrid({
                            x: GameSetup.cellSize,
                            y: GameSetup.cellSize,
                            offset: {x: GameSetup.originX, y: GameSetup.originY}
                        })
                    ],
                },
                onmove: (event) => {
                    event.target.setAttribute('data-moved', 'true');
                    event.target.style.top = (event.pageY - GameSetup.originY) + 'px';
                    event.target.style.left = (event.pageX - GameSetup.originX) + 'px';
                },
                restrict: {
                    drag: "parent",
                    elementRect: {top: 0, left: 0, bottom: 1, right: 1}
                }
            });
    }
}
