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
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw(ctx, image);
  }
}

export function updateEnemiesCoordinates(enemies) {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].updateCoordinates();
  }
}

export function checkEnemiesConditions(enemies, width, height) {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].checkConditions(width, height);
  }
}

function Enemy(x, y, speed, height, width) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.height = height;
  this.width = width;
  this.draw = function (ctx, image) {
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
  this.updateCoordinates = function () {
    this.x = this.x - this.speed;
  };
  this.checkConditions = function (width, height) {
    if (this.x > width) {
      this.x = 0 - this.width;
      this.y = randomNumber(height);
    }
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
}
