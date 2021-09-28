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
    let enemy = {
      x: enemyX,
      y: enemyY,
      speed: randomNumber(10) + 3,
      height: randomNumber(30) + 15,
      width: randomNumber(30) + 15,
    };
    enemies.push(enemy);
  }
  return enemies;
}

export function drawEnemies(ctx, enemies) {
  const originFillStyle = ctx.fillStyle;
  ctx.fillStyle = "red";
  for (let i = 0; i < enemies.length; i++) {
    const currentEnemy = enemies[i];
    ctx.fillRect(
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
      currentEnemy.y = Math.floor(Math.random() * height);
    }
    if (currentEnemy.x < 0 - currentEnemy.width) {
      currentEnemy.x = width;
      currentEnemy.y = Math.floor(Math.random() * height);
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
