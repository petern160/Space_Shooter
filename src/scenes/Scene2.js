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
      // adds tilesprite instead of image for moving background
    this.background = this.add.tileSprite(0,0, width, height, 'background')
    // set background origin to top left 
    this.background.setScale(2)
    this.background.setOrigin(0,0)

    this.ship1 = this.add.sprite(width/2 -50, height/2, "ship")
    this.ship1.setScale(1.5)
    this.ship2 = this.add.sprite(width/2, height/2, "ship2")
    this.ship2.setScale(1.5)
    this.ship3 = this.add.sprite(width/2 + 50, height/2, "ship3")
    this.ship3.setScale(1.5)

    this.anims.create({
        // animation name
        key:'ship1_anim',
        // frames from ship spritesheet
        frames: this.anims.generateFrameNumbers("ship"),
        frameRate: 20,
        // -1 infinite loop
        repeat:-1
    })

    this.anims.create({
        
        key:'ship2_anim',
        frames: this.anims.generateFrameNumbers("ship2"),
        frameRate: 20,
        repeat:-1
    })

    this.anims.create({
        
        key:'ship3_anim',
        frames: this.anims.generateFrameNumbers("ship3"),
        frameRate: 20,
        repeat:-1,
   
    })

    this.anims.create({
        
        key:'explode',
        frames: this.anims.generateFrameNumbers("explosion"),
        frameRate: 20,
        repeat:0,
        // disappears once completed
        hideOnComplete: true
    })

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // on click down does call back of destroy ship then passes in scope of this
    this.input.on('gameobjectdown', this.destroyShip, this)
    
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

  destroyShip(pointer, gameObject){
      gameObject.setTexture("explosion");
      gameObject.play("explode")
  }

  update() {
      this.moveShip(this.ship1, 2)
      this.moveShip(this.ship2, 2.5)
      this.moveShip(this.ship3, 3.3)
      // changes texture backgorund for moving effect
      this.background.tilePositionY -= 0.5;
  }
}

export default Scene1;