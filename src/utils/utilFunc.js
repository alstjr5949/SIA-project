export const isMouseInSquare = (x, y, square) => {
  let squareLeft = square.x;
  let squareRight = square.x + square.w;
  let squareTop = square.y;
  let squareBottom = square.y + square.h;

  if (x > squareLeft && x < squareRight && y > squareTop && y < squareBottom) {
    return true;
  }
  return false;
};
