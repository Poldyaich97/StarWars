export function checkPlayersConditions(x, y, width, height, playerW) {
  let newX = x;
  let newY = y;
  if (newX > width - playerW) {
    newX = 0;
  }
  if (newX < 0) {
    newX = width - playerW;
  }
  if (newY > height - playerW) {
    newY = 0;
  }
  if (newY < 0) {
    newY = height - playerW;
  }
  let coordinates = {
    x: newX,
    y: newY,
  };
  return coordinates;
}

export function drawPlayer(ctx, x, y, playerW, playerH) {
  ctx.fillRect(x, y, playerW, playerH);
}
export function updatePlayerCoordinates(x, y, speedX, speedY) {
  let newX = x + speedX;
  let newY = y + speedY;
  let coordinates = {
    x: newX,
    y: newY,
  };
  return coordinates;
}
