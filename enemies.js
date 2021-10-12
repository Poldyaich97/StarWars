function randomNumber(b) {
  const randomNumber = Math.random();
  const randomWidth = randomNumber * b;
  return Math.floor(randomWidth);
}
export function createEnemies(width, height, enemyNumber) {
  const enemies = [];
  for (let i = 0; i < enemyNumber; i++) {
    const enemyX = randomNumber(width);
    const enemyY = randomNumber(height);
    const speed = randomNumber(10) + 3;
    const enemyHeight = 32;
    const enemyWidth = 32;
    const enemy = new Enemy(enemyX, enemyY, speed, enemyHeight, enemyWidth);
    enemies.push(enemy);
  }
  return enemies;
}

export function drawEnemies(ctx, enemies, image) {
  const originFillStyle = ctx.fillStyle;
  ctx.fillStyle = "red";
  for (let i = 0; i < enemies.length; i++) {
    const currentEnemy = enemies[i];
    ctx.drawImage(
      image,
      0,
      0,
      currentEnemy.width,
      currentEnemy.height,
      currentEnemy.x,
      currentEnemy.y,
      currentEnemy.width,
      currentEnemy.height
    );
  }
  ctx.fillStyle = originFillStyle;
}

export function updateEnemiesCoordinates(enemies) {
  let newEnemies = [...enemies]; //копирование объекта, чтоб функция была чистой(чтоб не изменять входящие переменные)
  for (let i = 0; i < enemies.length; i++) {
    let currentEnemy = newEnemies[i];
    currentEnemy.x = currentEnemy.x - currentEnemy.speed;
  }
  return newEnemies;
}

export function checkEnemiesConditions(enemies, width, height) {
  let newEnemies = [...enemies];
  for (let i = 0; i < enemies.length; i++) {
    let currentEnemy = newEnemies[i];
    if (currentEnemy.x > width) {
      currentEnemy.x = 0 - currentEnemy.width;
      currentEnemy.y = randomNumber(height);
    }
    if (currentEnemy.x < 0 - currentEnemy.width) {
      currentEnemy.x = width;
      currentEnemy.y = randomNumber(height);
    }
    if (currentEnemy.y > height - currentEnemy.height) {
      currentEnemy.y = 0;
    }
    if (currentEnemy.y < 0) {
      currentEnemy.y = height - currentEnemy.height;
    }
  }
  return newEnemies;
}

function Enemy(x, y, speed, height, width) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.height = height;
  this.width = width;
}
