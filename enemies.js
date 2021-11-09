export function randomNumber(a, b) {
  const randomNumber = Math.random();
  const randomWidth = randomNumber * (b - a);
  return Math.floor(randomWidth + a);
}
export function createEnemies(width, height, enemyNumber) {
  const enemies = [];
  fillEnemies(enemies, width, height, enemyNumber);
  return enemies;
}
export function fillEnemies(enemies, width, height, enemyNumber) {
  const enemyHeight = 32;
  const enemyWidth = 32;
  for (let i = 0; i < enemyNumber; i++) {
    const enemyX = width + randomNumber(0, 160);
    const enemyY = randomNumber(0, height - enemyHeight);
    const speedX = randomNumber(1, 3);
    const speedY = randomNumber(1, 3);
    const enemy = new Enemy(
      enemyX,
      enemyY,
      speedX,
      speedY,
      enemyHeight,
      enemyWidth
    );
    enemies.push(enemy);
  }
}
function Enemy(x, y, speedX, speedY, height, width) {
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
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
Enemy.prototype.updateCoordinates = function (width, height, handleBreaking) {
  this.x = this.x - this.speedX; //обновление координат врагов
  this.y = this.y + this.speedY;

  if (this.x < 0 - this.width) {
    //проверка на пересечение границы
    this.x = width;
    this.y = randomNumber(0, height);
    handleBreaking();
  }
  if (this.y > height - this.height || this.y < 0) {
    // проверка пересечения верхней и нижней границы.
    this.speedY = -this.speedY; // изменение  скорости по Y
  }
};
