/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import Phaser from "phaser";

let gameSettings = {
  playerSpeed: 200
};

let height = 544;
let width = 512;
let bullet;

class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    var x = scene.player.x;
    var y = scene.player.y;
    super(scene, x, y, "beam");
    // scene.projectiles.add(this);
  }

  update() {
    if (this.y < 32) {
      this.destroy();
      console.log("hey");
    }
  }
}

class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "playGame" });
  }

  preload() {}

  create() {
    // declare class var to access inside the class
    // adds tilesprite instead of image for moving background
    this.background = this.add.tileSprite(0, 0, width, height, "background");
    // set background origin to top left scales image by two
    this.background.setScale(1);
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(width / 2 - 50, height / 2, "ship");
    this.ship1.setScale(1.5);
    this.ship2 = this.add.sprite(width / 2, height / 2, "ship2");
    this.ship2.setScale(1.5);
    this.ship3 = this.add.sprite(width / 2 + 50, height / 2, "ship3");
    this.ship3.setScale(1.5);

    // bullet = this.play(b)

    // spawns player and sets the animation
    this.player = this.physics.add.sprite(width / 2 - 8, height - 64, "player");
    this.player.play("thrust");
    // allows input from keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    // spacebar key to shoot
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
    this.beam.setScale(0.01);

    this.projectiles = this.add.group();
    this.projectiles.add(this.beam);

    // powerups
    this.powerUps = this.physics.add.group();
    // power up quanitiy
    var maxObjects = 4;
    for (var i = 0; i < maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "powerup");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, width, height);
      powerUp.setScale(1.2);
      // spawns randomly red or grey
      if (Math.random() > 0.5) {
        powerUp.play("red");
      }
      if (Math.random() < 0.5) {
        powerUp.play("grey");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    // on click down does call back of destroyship() then passes in scope of this
    this.input.on("gameobjectdown", this.destroyShip, this);

    // this.add.text(20, 20, 'PLAYING GAME', {font: "25px Arial", fill: "yellow"});
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(width, 0);
    graphics.lineTo(width, 20);
    graphics.lineTo(0, 30);
    graphics.lineTo(0, 30);
    //
    graphics.closePath();
    graphics.fillPath();

    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 35);
    this.physics.add.collider(this.projectiles, this.powerUps);
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickPowerUp,
      null,
      this
    );

    // overlap parameters, callback then scope
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPlayer,
      null,
      this
    );
  }

  hitEnemy(projectile, enemy) {
    projectile.destroy();
    this.resetShipPos(enemy);
    this.score += 15;
    this.scoreLabel.text = "SCORE  " + this.score;
  }
  // callback function for overlap of player and powerUp
  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
  }

  // call back function for overlap of player and enemies
  hurtPlayer(player, enemy) {
    this.resetShipPos(enemy);
    player.x = width / 2 - 8;
    player.y = height - 64;
  }

  // moves ship down the screen then calls resetshippos once the height is bigger then canvas
  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > height) {
      this.resetShipPos(ship);
    }
  }

  // resets the ship positioning to 0 at y axis
  resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, width);
    ship.x = randomX;
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-150);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setAccelerationX(150);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-150);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setAccelerationY(150);
    }
  }

  shootBeam() {
    // let beam = new Beam(this)
    this.beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
    this.beam.play("beam_anim");
    this.beam.body.setEnable();
    this.beam.body.velocity.y = -250;
    this.beam.setScale(2);
    this.projectiles = this.add.group();
    this.projectiles.add(this.beam);
    // fixes projectile bouncing off powerup
    this.physics.add.collider(this.projectiles, this.powerUps, function(
      projectile,
      powerUp
    ) {
      projectile.destroy();
    });
    // destroys enemy and resets position
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
  }

  update() {
    this.moveShip(this.ship1, 2);
    this.moveShip(this.ship2, 2.5);
    this.moveShip(this.ship3, 3.3);
    // changes texture backgorund for moving effect
    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }

    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }
}

export default Scene1;
