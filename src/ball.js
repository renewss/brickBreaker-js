export default class Ball {
  constructor(gameWidth, gameHeight, game) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("img-ball");
    this.game = game;
    this.size = {
      x: 16,
      y: 16
    };
    this.position = {
      x: 100,
      y: 200
    };
    this.speed = {
      x: 5,
      y: 5
    };
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
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //collision with left or right wall
    if (this.position.x < 0 || this.position.x + this.size.x > this.gameWidth)
      this.speed.x = -this.speed.x;

    //collision with top or bottom wall
    if (this.position.y < 0) this.speed.y = -this.speed.y;
    if (this.position.y + this.size.y > this.gameHeight) {
      this.game.lives--;
      this.speed.y = -this.speed.y;
    }
  }

  reset() {
    this.position = {
      x: 100,
      y: 200
    };
  }
}
