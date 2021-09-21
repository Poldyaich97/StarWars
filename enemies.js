export function createEnemies(width, height) {
  const enemies = [];
  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.random();
    const randomWidth = randomNumber * width;
    const enemyX = Math.floor(randomWidth);

    let enemyY = Math.floor(Math.random() * height);
    let enemyCoordinates = {
      x: enemyX,
      y: enemyY,
    };
    enemies.push(enemyCoordinates);
  }
  return enemies;
}

export function drawEnemies(ctx, enemies, enemyW, enemyH) {
  const originFillStyle = ctx.fillStyle;
  ctx.fillStyle = "red";
  for (let i = 0; i < 10; i++) {
    const currentEnemy = enemies[i];
    ctx.fillRect(currentEnemy.x, currentEnemy.y, enemyW, enemyH);
  }
  ctx.fillStyle = originFillStyle;
}

export function updateEnemiesCoordinates(enemies) {
  let newEnemies = Object.assign({}, enemies);
  for (let i = 0; i < 10; i++) {
    let currentEnemy = newEnemies[i];
    currentEnemy.x = currentEnemy.x - 1;
  }
  return newEnemies;
}

export function checkEnemiesConditions(enemies, width, height, enemyW, enemyH) {
  let newEnemies = Object.assign({}, enemies);
  for (let i = 0; i < 10; i++) {
    let a = newEnemies[i];
    if (a.x > width) {
      a.x = 0 - enemyW;
      a.y = Math.floor(Math.random() * height);
    }
    if (a.x < 0 - enemyW) {
      a.x = width;
      a.y = Math.floor(Math.random() * height);
    }
    if (a.y > height - enemyH) {
      a.y = 0;
    }
    if (a.y < 0) {
      a.y = height - enemyH;
    }
  }
  return newEnemies;
}
