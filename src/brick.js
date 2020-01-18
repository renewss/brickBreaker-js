import { collision } from "./collision";

export default class Brick {
  constructor(position, ball) {
    this.image = document.getElementById("img-brick");
    this.ball = ball;
    this.size = {
      x: 80,
      y: 20
    };
    this.position = position;

    this.isDeleted = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }

  update() {
    if (collision(this.ball, this)) {
      this.ball.speed.y = -this.ball.speed.y;
      this.isDeleted = true;
    }
  }
}
