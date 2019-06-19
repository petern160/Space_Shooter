/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import Phaser from "phaser";

import background from "../assets/background.png";
import ground from "../assets/platform.png";
import dude from "../assets/dude.png";

let height = 544;
let width = 512

class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "playGame" });
  }

  preload() {}
  
  create() {
      // declare class var to access inside the class 
    this.background = this.add.image(0,0, 'background')
    // set background origin to top left 
    this.background.setScale(2)
    this.background.setOrigin(0,0)

    this.ship1 = this.add.image(width/2 -50, height/2, "ship")
    this.ship1.setScale(1.5)
    this.ship2 = this.add.image(width/2, height/2, "ship2")
    this.ship2.setScale(1.5)
    this.ship3 = this.add.image(width/2 + 50, height/2, "ship3")
    this.ship3.setScale(1.5)
    
    this.add.text(20, 20, 'PLAYING GAME', {font: "25px Arial", fill: "yellow"});
  
  }

 
  // moves ship down the screen
  moveShip(ship, speed){
      ship.y += speed;
      if (ship.y > height){
          this.resetShipPos(ship)
      }
  }

  resetShipPos(ship){
      ship.y = 0;
      var randomX = Phaser.Math.Between(0, width);
      ship.x = randomX;
  }

  update() {
      this.moveShip(this.ship1, 1)
      this.moveShip(this.ship2, 2)
      this.moveShip(this.ship3, 3)
  }
}

export default Scene1;
