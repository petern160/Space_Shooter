/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import Phaser from "phaser";
import background from "../assets/background.png";
import ship from "../assets/ship.png";
import ship2 from "../assets/ship2.png";
import ship3 from "../assets/ship3.png";

class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "bootGame" });
  }

  preload() {
    this.load.image('background', background)
    this.load.image('ship', ship)
    this.load.image('ship2', ship2)
    this.load.image('ship3', ship3)
  }
   
  create() {
    this.add.text(20, 20, 'loading game....');
    this.scene.start("playGame")
  }

  update() {}
}

export default Scene1;
