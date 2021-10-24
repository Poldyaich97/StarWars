function randomNumber(b) {
  const randomNumber = Math.random();
  const randomWidth = randomNumber * b;
  return Math.floor(randomWidth);
}
export function createEnemies(width, height, enemyNumber) {
  const enemies = [];
  fillEnemies(enemies, width, height, enemyNumber);
  return enemies;
}
export function fillEnemies(enemies, width, height, enemyNumber) {
  for (let i = 0; i < enemyNumber; i++) {
    const enemyX = width + randomNumber(160);
    const enemyY = randomNumber(height);
    // const speed = randomNumber(10) + 3;
    const speed = 2;
    const enemyHeight = 32;
    const enemyWidth = 32;
    const enemy = new Enemy(enemyX, enemyY, speed, enemyHeight, enemyWidth);
    enemies.push(enemy);
  }
}
function Enemy(x, y, speed, height, width) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.height = height;
  this.width = width;
}

Enemy.prototype.draw = function (ctx, image) {
  ctx.drawImage(
    image,
    0,
    0,
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height
  );
};
Enemy.prototype.updateCoordinates = function (width, height) {
  this.x = this.x - this.speed;
  if (this.x < 0 - this.width) {
    this.x = width;
    this.y = randomNumber(height);
  }
  if (this.y > height - this.height) {
    this.y = 0;
  }
  if (this.y < 0) {
    this.y = height - this.height;
  }
};
