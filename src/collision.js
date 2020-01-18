export function collision(ball, object) {
  if (
    ball.position.y <= object.position.y + object.size.y &&
    ball.position.y + ball.size.y >= object.position.y
  ) {
    if (
      ball.position.x >= object.position.x &&
      ball.position.x + ball.size.x <= object.position.x + object.size.x
    )
      return 1;
  } else if (
    ball.position.x >= object.position.x &&
    ball.position.x + ball.size.x <= object.position.x + object.size.x
  ) {
    if (
      ball.position.y <= object.position.y + object.size.y &&
      ball.position.y + ball.size.y >= object.position.y
    )
      return 2;
  } else {
    return false;
  }
}
