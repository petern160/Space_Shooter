/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import Phaser from "phaser";

import background from "../assets/background.png";
import ground from "../assets/platform.png";
import dude from "../assets/dude.png";

class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "playGame" });
  }

  preload() {}
  
 
  
  create() {
      // declare class var to access inside the class 
    this.background = this.add.image(0,0, 'background')
    // set background origin to top left 
    this.background.setOrigin(0,0)

    this.ship1 = this.add.image(256/2 -50, 272/2, "ship")
    this.ship2 = this.add.image(256/2, 272/2, "ship2")
    this.ship3 = this.add.image(256/2 + 50, 272/2, "ship3")
    
    this.add.text(20, 20, 'PLAYING GAME', {font: "25px Arial", fill: "yellow"});
  
  }

  update() {}
}

export default Scene1;
