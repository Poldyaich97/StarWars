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
let speedX = 0;
let speedY = 0;
let fps = 60;
let canvas, ctx;
let enemies = [];
let playerW = 20;
let playerH = 20;
let enemyW = 20;
let enemyH = 20;
let x = 50;
let y = height / 2 - playerH / 2;

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
        speedX = -30;
        break;
      case "ArrowRight":
        speedX = 30;
        break;
      case "Shift":
        speedY = 0;
        speedX = 0;
        break;
      case "ArrowUp":
        speedY = -30;
        break;
      case "ArrowDown":
        speedY = 30;
        break;
    }
  });
  document.addEventListener("keyup", (event) => {
    const k = event.key;
    switch (k) {
      case "ArrowLeft":
        speedX = 0;
        break;
      case "ArrowRight":
        speedX = 0;
        break;
      case "ArrowUp":
        speedY = 0;
        break;
      case "ArrowDown":
        speedY = 0;
        break;
    }
  });
}

function crashCheck() {
  for (let i = 0; i < 10; i++) {
    let e = enemies[i];
    const pyEnd = y + playerH;
    const pxEnd = x + playerW;
    const eyEnd = e.y + enemyW;
    const exEnd = e.x + enemyH;
    if (eyEnd < y || e.y > pyEnd || exEnd < x || e.x > pxEnd) {
    } else {
      alert("You Lose");
      x = 50;
      y = height / 2 - playerH / 2;
      speedX = 0;
      speedY = 0;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  drawPlayer(ctx, x, y, playerW, playerH);
  drawEnemies(ctx, enemies, enemyW, enemyH);
}

function setupInterval() {
  setInterval(() => {
    let coordinates = updatePlayerCoordinates(x, y, speedX, speedY);
    x = coordinates.x;
    y = coordinates.y;
    enemies = updateEnemiesCoordinates(enemies);
    coordinates = checkPlayersConditions(x, y, width, height, playerW);
    x = coordinates.x;
    y = coordinates.y;
    enemies = checkEnemiesConditions(enemies, width, height, enemyW, enemyH);
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

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.height = height;
  canvas.width = width;
});
