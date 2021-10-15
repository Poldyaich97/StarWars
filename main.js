import {
  createEnemies,
  updateEnemiesCoordinates,
  checkEnemiesConditions,
  drawEnemies,
} from "./enemies.js";

import { Player } from "./player.js";

import { Shot, drawShots } from "./shots.js";

let width = window.innerWidth;
let height = window.innerHeight;
let canvas, ctx;

let enemies = [];
let tiles = {};
const shots = []; // Функция отрисовки,создания, обновления координат, пересечения с врагами.
//нужно,чтоб они удалялись(патроны)

const enemyNumber = 10;
const player = new Player();

function drawBackground(ctx, image, width, height) {
  const pattern = ctx.createPattern(image, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, width, height);
}

function loadImg(url, key) {
  return new Promise((resolve) => {
    let image = document.createElement("img");
    image.addEventListener("load", () => {
      tiles[key] = image;
      resolve();
    });

    image.setAttribute("src", url);
  });
}

async function init() {
  canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  document.getElementById("root").appendChild(canvas);
  ctx = canvas.getContext("2d");
  await Promise.all([
    loadImg("./img/Dove.png", "enemy"),
    loadImg("./img/Lightning.png", "player"),
    loadImg("./img/bg.png", "bg"),
  ]);
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

  document.addEventListener("keydown", (event) => {
    const b = event.key;
    switch (b) {
      case " ":
        const shot = new Shot(player.x, player.y, 5);
        shots.push(shot);
    }
  });
  document.addEventListener("touchstart", (event) => {
    if (event.touches[0].clientY < player.y + player.height / 2) {
      player.speedY = -5;
    } else {
      player.speedY = 5;
    }
  });

  document.addEventListener("touchend", (event) => {
    player.speedY = 0;
  });
  document.addEventListener("mousemove", (event) => {
    player.x = event.clientX;
    player.y = event.clientY;
  });

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.height = height;
    canvas.width = width;
  });
}
function isIntersect(player, enemy) {
  const pyEnd = player.y + player.height;
  const pxEnd = player.x + player.width;
  const eyEnd = enemy.y + enemy.height;
  const exEnd = enemy.x + enemy.width;
  return !(
    eyEnd < player.y ||
    enemy.y > pyEnd ||
    exEnd < player.x ||
    enemy.x > pxEnd
  );
}

function crashCheck() {
  for (let i = 0; i < enemies.length; i++) {
    const intersect = isIntersect(player, enemies[i]);
    if (intersect) {
      player.x = 50;
      player.y = height / 2 - player.height / 2;
      player.speedX = 0;
      player.speedY = 0;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  drawBackground(ctx, tiles.bg, width, height);
  player.draw(ctx, tiles.player);
  drawEnemies(ctx, enemies, tiles.enemy);
  drawShots(ctx, shots);
}

function mainTick() {
  player.updateCoordinates();
  player.checkConditions(width, height);
  updateEnemiesCoordinates(enemies);
  checkEnemiesConditions(enemies, width, height);
  draw();
  crashCheck();
  window.requestAnimationFrame(mainTick);
}

document.addEventListener("DOMContentLoaded", async () => {
  await init();
  enemies = createEnemies(width, height, enemyNumber);
  mainTick();
  setupListeners();
});
