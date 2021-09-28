import {
  createEnemies,
  updateEnemiesCoordinates,
  checkEnemiesConditions,
  drawEnemies,
} from "./enemies.js";

import {
  updatePlayerCoordinates,
  checkPlayersConditions,
  drawPlayer,
} from "./player.js";

let width = window.innerWidth;
let height = window.innerHeight;
let fps = 60;
let canvas, ctx;

let enemies = [];
// каждому врагу добавим свою скорость - случайно сгенерированную (1 - 5)

// скорость и размер каждого врага хранит в самом враге

// (enemySpecifications додумался только до объекта)
let enemySpecifications = {
  height: 20,
  width: 20,
  speed: 2,
};

// должно быть количество врагов
const enemyNumber = 25;

// объединить в объект (объединил в player)
let player = {
  width: 20,
  height: 20,
  speedX: 0,
  speedY: 0,
  speed: 30,
};

let x = 50;
let y = height / 2 - player.height / 2;

function init() {
  canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  document.getElementById("root").appendChild(canvas);
  ctx = canvas.getContext("2d");
}

function setupListeners() {
  document.addEventListener("keydown", (event) => {
    const k = event.key;
    switch (k) {
      case "ArrowLeft":
        player.speedX = -player.speed;
        break;
      case "ArrowRight":
        player.speedX = player.speed;
        break;
      case "Shift":
        player.speedY = 0;
        player.speedX = 0;
        break;
      case "ArrowUp":
        player.speedY = -player.speed;
        break;
      case "ArrowDown":
        player.speedY = player.speed;
        break;
    }
  });
  document.addEventListener("keyup", (event) => {
    const k = event.key;
    switch (k) {
      case "ArrowLeft":
        player.speedX = 0;
        break;
      case "ArrowRight":
        player.speedX = 0;
        break;
      case "ArrowUp":
        player.speedY = 0;
        break;
      case "ArrowDown":
        player.speedY = 0;
        break;
    }
  });
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.height = height;
    canvas.width = width;
  });
}

function crashCheck() {
  for (let i = 0; i < 10; i++) {
    let e = enemies[i];
    const pyEnd = y + player.height;
    const pxEnd = x + player.width;
    const eyEnd = e.y + enemySpecifications.width;
    const exEnd = e.x + enemySpecifications.height;
    if (eyEnd < y || e.y > pyEnd || exEnd < x || e.x > pxEnd) {
    } else {
      x = 50;
      y = height / 2 - player.height / 2;
      player.speedX = 0;
      player.speedY = 0;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  drawPlayer(ctx, x, y, player.width, player.height);
  drawEnemies(ctx, enemies, enemySpecifications);
}

function setupInterval() {
  setInterval(() => {
    let coordinates = updatePlayerCoordinates(
      x,
      y,
      player.speedX,
      player.speedY
    );
    // 2 раза присваеваем x и y. Сделать чтобы 1
    x = coordinates.x;
    y = coordinates.y;
    coordinates = checkPlayersConditions(x, y, width, height, player.width);
    x = coordinates.x;
    y = coordinates.y;
    // Тоже самое с enemies
    enemies = updateEnemiesCoordinates(enemies);
    enemies = checkEnemiesConditions(
      enemies,
      width,
      height,
      enemySpecifications
    );
    draw();
    crashCheck();
  }, 1000 / fps);
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  enemies = createEnemies(width, height);
  setupInterval();
  setupListeners();
});

document.addEventListener("touchstart", (event) => {
  if (event.touches[0].clientY < y + player.height / 2) {
    player.speedY = -5;
  } else {
    player.speedY = 5;
  }
});

document.addEventListener("touchend", (event) => {
  player.speedY = 0;
});

// fps - через range
