/**
 * Created by valentin.sauer on 30.05.2016.
 */
import {GameSetup} from "./game-setup";


export class Ship {
    x:number;
    y:number;
    length:number;
    orientation:string;
    left:string;
    top:string;

    constructor(x, y, length) {
        this.setX(x);
        this.setY(y);
        this.length = length;
        this.orientation = 'horizontal';
    }

    setX(x:number) {
        this.x = x;
        this.left = (GameSetup.cellSize * this.x) + 'px';
    }

    setY(y:number) {
        this.y = y;
        this.top = (GameSetup.cellSize * this.y) + 'px';
    }


    /*
     render2() {
     let ship = document.createElement('div');
     ship.setAttribute('data-type', type.toString());
     ship.setAttribute('data-x', '0');
     ship.setAttribute('data-y', this.shipCount.toString());
     ship.setAttribute('data-orientation', 'horizontal');

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


     if (ship.getAttribute('data-orientation') == 'horizontal') {
     ship.setAttribute('data-orientation', 'vertical');
     } else {
     ship.setAttribute('data-orientation', 'horizontal');
     }


     ship.classList.toggle('rotate');

     if (ship.getAttribute('data-orientation') == 'horizontal') {
     ship.setAttribute('data-orientation', 'vertical');
     } else {
     ship.setAttribute('data-orientation', 'horizontal');
     }
     }

     var newX = Math.floor(parseFloat(ship.style.left) / this.cellSize);
     var newY = Math.floor(parseFloat(ship.style.top) / this.cellSize);

     if (this.moveAllowed(newX, newY, ship)) {
     ship.setAttribute('data-x', newX.toString());
     ship.setAttribute('data-y', newY.toString());
     } else {
     ship.style.left = (this.cellSize * ship.getAttribute('data-x')) + 'px';
     ship.style.top = (this.cellSize * ship.getAttribute('data-y')) + 'px';
     return;
     }
     console.log("X: " + ship.getAttribute('data-x') + " Y: " + ship.getAttribute('data-y'));
     })

     game.appendChild(ship);
     this.shipCount++;
     }
     */
}