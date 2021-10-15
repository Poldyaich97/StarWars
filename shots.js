export function Shot(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
}

export function drawShots(ctx, shots) {
  // console.log(shots[2]?.x);
  ctx.fillStyle = "red";
  for (let i = 0; i < shots.length; i++) {
    ctx.fillRect(shots[i].x, shots[i].y, 5, 5);
    // ctx.fillRect(20, 20, 100, 100);
    // console.log(shots);
  }
}
