export function Shot(x, y, speed, size) {
  this.x = x;
  this.y = y;
  this.width = size;
  this.height = size;
  this.speed = speed;
  this.updateCoordinates = function () {
    this.x = this.x + this.speed;
  };
}

export function drawShots(ctx, shots) {
  ctx.fillStyle = "red";
  for (let i = 0; i < shots.length; i++) {
    ctx.fillRect(shots[i].x, shots[i].y, shots[i].width, shots[i].height);
  }
}

export function updateShotsCoordinates(shots, width) {
  for (let i = 0; i < shots.length; i++) {
    shots[i].updateCoordinates();
    if (shots[i].x > width) {
      shots.splice(i, 1);
    }
  }
}
