import { collision } from "/src/collision";

export default class Paddle {
  constructor(gameWidth, gameHeight, ball) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.ball = ball;
    this.size = {
      x: 160,
      y: 20
    };
    this.position = {
      x: (this.gameWidth - this.size.x) / 2,
      y: this.gameHeight - (this.size.y + 10)
    };
    this.maxSpeed = 8;
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x <= 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.size.x >= this.gameWidth) {
      this.position.x = this.gameWidth - this.size.x;
    }

    if (collision(this.ball, this)) {
      this.ball.position.y = this.position.y - this.ball.size.y;
      this.ball.speed.y = -this.ball.speed.y;
    }
  }
}
