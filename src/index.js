/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import Phaser from "phaser";

import constants from "./config/constants";
import Scene1 from "./scenes/Scene1";
import Scene2 from "./scenes/Scene2";

const config = {
  type: Phaser.AUTO,
  width: constants.WIDTH,
  height: constants.HEIGHT,
  backgroundColor: 0x000000,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200
      },
      debug: false
    }
  },
  scene: [Scene1, Scene2]
};

// eslint-disable-next-line no-new
new Phaser.Game(config);

if (module.hot) {
  module.hot.accept(() => {});

  module.hot.dispose(() => {
    window.location.reload();
  });
}
