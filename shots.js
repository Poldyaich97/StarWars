export function Shot(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.updateCoordinates = function () {
    this.x = this.x + this.speed;
  };
}

export function drawShots(ctx, shots) {
  ctx.fillStyle = "red";
  for (let i = 0; i < shots.length; i++) {
    ctx.fillRect(shots[i].x, shots[i].y, 5, 5);
  }
}

export function updateShotsCoordinates(shots) {
  for (let i = 0; i < shots.length; i++) {
    shots[i].updateCoordinates();
  }
}
