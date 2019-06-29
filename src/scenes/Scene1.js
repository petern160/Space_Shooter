/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import Phaser from "phaser";
import background from "../assets/pic.gif";
import ship from "../assets/s1sprite.png";
import ship2 from "../assets/s2sprite.png";
import ship3 from "../assets/s3sprite.png";
import explosion from "../assets/explosion.png";
import powerup from "../assets/power-up.png";
import player from "../assets/witch.png";
import beam from "../assets/beam.png";
import font from "../assets/font.png";
import fontXml from "../assets/font.xml";

class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "bootGame" });
  }

  preload() {
    this.load.image("background", background);
    this.load.spritesheet("ship", ship, {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", ship2, {
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", ship3, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", explosion, {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("powerup", powerup, {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", player, {
      frameWidth: 48,
      frameHeight: 64
    });
    this.load.spritesheet("beam", beam, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.bitmapFont("pixelFont", font, fontXml);
  }

  create() {
    this.add.text(20, 20, "loading game....");
    this.scene.start("playGame");
    this.anims.create({
      // animation name
      key: "ship1_anim",
      // frames from ship spritesheet
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      // -1 infinite loop
      repeat: -1
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      // disappears once completed
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("powerup", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "grey",
      frames: this.anims.generateFrameNumbers("powerup", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });
  }

  update() {}
}

export default Scene1;
