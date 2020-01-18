import Brick from "/src/brick";

export function levelBuilder(level, ball) {
  let bricks = [];
  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 20 + 20 * rowIndex
        };
        bricks.push(new Brick(position, ball));
      }
    });
  });

  return bricks;
}

export const level1 = [
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export const level2 = [
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];
