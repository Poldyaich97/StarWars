function randomNumber(b) {
  const randomNumber = Math.random();
  const randomWidth = randomNumber * b;
  return Math.floor(randomWidth);
}
export function createEnemies(width, height) {
  const enemies = [];
  // 10 - должна быть не хардкор а переменная из main
  for (let i = 0; i < 10; i++) {
    const enemyX = randomNumber(width);
    const enemyY = randomNumber(height);
    let enemy = {
      x: enemyX,
      y: enemyY,
      speed: randomNumber(10) + 3,
    };
    enemies.push(enemy);
  }
  return enemies;
}

export function drawEnemies(ctx, enemies, enemySpecifications) {
  const originFillStyle = ctx.fillStyle;
  ctx.fillStyle = "red";
  // 10 - должна быть не хардкор а длина массива
  for (let i = 0; i < 10; i++) {
    const currentEnemy = enemies[i];
    ctx.fillRect(
      currentEnemy.x,
      currentEnemy.y,
      enemySpecifications.width,
      enemySpecifications.height
    );
  }
  ctx.fillStyle = originFillStyle;
}

export function updateEnemiesCoordinates(enemies) {
  let newEnemies = Object.assign({}, enemies); //копирование объекта, чтоб функция была чистой(чтоб не изменять входящие переменные)
  // 10 - должна быть не хардкор а длина массива
  for (let i = 0; i < 10; i++) {
    let currentEnemy = newEnemies[i];
    currentEnemy.x = currentEnemy.x - currentEnemy.speed;
  }
  return newEnemies;
}

export function checkEnemiesConditions(
  enemies,
  width,
  height,
  enemySpecifications
) {
  let newEnemies = Object.assign({}, enemies);
  // 10 - должна быть не хардкор а длина массива
  for (let i = 0; i < 10; i++) {
    let a = newEnemies[i];
    if (a.x > width) {
      a.x = 0 - enemySpecifications.width;
      a.y = Math.floor(Math.random() * height);
    }
    if (a.x < 0 - enemySpecifications.width) {
      a.x = width;
      a.y = Math.floor(Math.random() * height);
    }
    if (a.y > height - enemySpecifications.height) {
      a.y = 0;
    }
    if (a.y < 0) {
      a.y = height - enemySpecifications.height;
    }
  }
  return newEnemies;
}
