import Paddle from "/src/paddle";
import InputHandler from "/src/inputHandler";
import Ball from "/src/ball";
import { levelBuilder, level1, level2 } from "/src/gameLevels";

const GAMESTATES = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gameState = GAMESTATES.MENU;
    this.ball = new Ball(this.gameWidth, this.gameHeight, this);
    this.paddle = new Paddle(this.gameWidth, this.gameHeight, this.ball);
    this.objects = [];

    this.levels = [level1, level2];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gameState !== GAMESTATES.MENU &&
      this.gameState !== GAMESTATES.NEWLEVEL
    )
      return;

    this.lives = 3;

    this.bricks = levelBuilder(this.levels[this.currentLevel], this.ball);
    this.objects = [this.paddle, this.ball, ...this.bricks];
    this.gameState = GAMESTATES.RUNNING;

    this.ball.reset();
  }

  update() {
    if (this.lives === 0) this.gameState = GAMESTATES.GAMEOVER;

    if (
      this.gameState === GAMESTATES.PAUSED ||
      this.gameState === GAMESTATES.MENU ||
      this.gameState === GAMESTATES.GAMEOVER ||
      this.gameState === GAMESTATES.NEWLEVEL
    )
      return;

    this.objects.forEach(object => object.update());

    this.bricks = this.bricks.filter(brick => !brick.isDeleted);
    this.objects = this.objects.filter(object => !object.isDeleted);

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gameState = GAMESTATES.NEWLEVEL;
      this.start();
    }
  }

  draw(ctx) {
    ctx.font = "20px Ariel";
    ctx.fillText(this.lives, this.gameWidth - 20, 15);
    this.objects.forEach(object => object.draw(ctx));

    if (this.gameState === GAMESTATES.PAUSED) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "30px Arial";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    } else if (this.gameState === GAMESTATES.MENU) {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "30px Arial";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press Spacebar to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    } else if (this.gameState === GAMESTATES.GAMEOVER) {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "30px Arial";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATES.RUNNING)
      this.gameState = GAMESTATES.PAUSED;
    else this.gameState = GAMESTATES.RUNNING;
  }
}
