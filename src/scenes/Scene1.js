/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import Phaser from "phaser";
import background from "../assets/background.png";
import ship from "../assets/s1sprite.png";
import ship2 from "../assets/s2sprite.png";
import ship3 from "../assets/s3sprite.png";
import explosion from "../assets/explosion.png";


class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "bootGame" });
  }

  preload() {
    this.load.image('background', background)
    this.load.spritesheet('ship', ship, {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('ship2', ship2, {
      frameWidth: 32,
      frameHeight: 16,
    })
    this.load.spritesheet('ship3', ship3, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('explosion', explosion, {
      frameWidth: 16,
      frameHeight: 16,
    })
   
  }
   
  create() {
    this.add.text(20, 20, 'loading game....');
    this.scene.start("playGame")
  }

  update() {}
}

export default Scene1;
