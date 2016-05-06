import {Page, NavController} from 'ionic-angular';
import {GamePlay} from '../game-play/game-play';
import * as interact from 'interact.js';


@Page({
    templateUrl: 'build/pages/game-setup/game-setup.html',
})
export class GameSetup {

    cells:Array<number> = [];
    originX:number;
    originY:number;
    cellSize:number;
    shipCount:number = 0;

    constructor(private nav:NavController) {
        for (let i = 0; i < 100; i++) {
            this.cells.push(i);
        }
    }

    startGame(){

        let shipElements = document.getElementsByClassName('ship');
        let ships = [];

        for (let i = 0; i < shipElements.length; i++){
            let shipElement = shipElements.item(i);
            let ship = {
                orientation : shipElement.classList.contains('rotate') ? 'vertical' : 'horizontal',
                type : shipElement.getAttribute('data-type'),
                x : parseInt(shipElement.getAttribute('data-x')),
                y : parseInt(shipElement.getAttribute('data-y'))
            }

            ships.push(ship);
        }

        this.nav.push(GamePlay, {
            ships: ships
        });
    }

    initShip(game:HTMLElement, type:number) {
        let ship = document.createElement('div');
        ship.setAttribute('data-type', type.toString());
        ship.setAttribute('data-x', '0');
        ship.setAttribute('data-y', this.shipCount.toString());

        ship.className = 'ship ship-' + type;
        ship.style.height = this.cellSize + 'px';
        ship.style.width = (this.cellSize * type) + 'px';
        ship.style.left = '0px';
        ship.style.top = (this.cellSize * this.shipCount) + 'px';

        ship.style.transformOrigin = this.cellSize / 2 + 'px ' + this.cellSize / 2 + 'px';

        ship.addEventListener('touchstart', () => {
            ship.setAttribute('data-moved', 'false');
        })

        ship.addEventListener('touchend', () => {
            if (ship.getAttribute('data-moved') === 'false') {
                ship.classList.toggle('rotate');
            }

            ship.setAttribute('data-x', Math.round(parseFloat(ship.style.left) / this.cellSize).toString());
            ship.setAttribute('data-y', Math.round(parseFloat(ship.style.top) / this.cellSize).toString());
        })

        game.appendChild(ship);
        this.shipCount++;
    }

    ngAfterContentInit() {

        let game = document.getElementById('game');
        game.style.height = game.clientWidth + 'px';

        this.cellSize = game.clientWidth / 10;
        this.originX = game.getClientRects()[0].left;
        this.originY = game.getClientRects()[0].top;

        let z = 4;
        for (let i = 2; i <= 5; i++) {
            let j = 0;
            while (j < z) {
                this.initShip(game, i);
                j++;
            }
            z--;
        }

        interact('.ship')
            .draggable({
                relativePoints: [
                    { x: 0  , y: 0   }   // snap relative to the element's top-left,
                ]
                restrict: {
                    restriction: 'parent',
                    elementRect: {top: 0, left: 0, bottom: 1, right: 1},
                    endOnly: true
                },
                snap: {
                    targets: [
                        interact.createSnapGrid({
                            x: this.cellSize,
                            y: this.cellSize,
                            offset: {x: this.originX, y: this.originY}
                        })
                    ],
                },
                onmove: (event) => {
                    event.target.setAttribute('data-moved', 'true');
                    event.target.style.top = (event.pageY - this.originY) + 'px';
                    event.target.style.left = (event.pageX - this.originX) + 'px';
                }
            });
    }
}