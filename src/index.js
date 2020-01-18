//Renewss 2019

import Game from "/src/game";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let canvas = document.getElementById("game-board");
let ctx = canvas.getContext("2d");

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx);
  game.update();

  requestAnimationFrame(gameLoop);
}

gameLoop();
