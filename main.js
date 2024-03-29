import { createEnemies, fillEnemies, randomNumber } from "./enemies.js";

import { Player } from "./player.js";

import { Shot, drawShots, updateShotsCoordinates } from "./shots.js";

let width = window.innerWidth;
let height = window.innerHeight;
let canvas, ctx;
const INITIAL_LIVES = 3;
let lives = INITIAL_LIVES;
let enemies = [];
let tiles = {};
const shots = [];
let shotCreatingIntervalId;
const enemyNumber = 30;
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
    loadImg("./img/dove.png", "enemy"),
    loadImg("./img/lightning.png", "player"),
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
        if (shotCreatingIntervalId === undefined) {
          shots.push(new Shot(player.centerX(), player.centerY(), 5, 5));
          shotCreatingIntervalId = setInterval(() => {
            let shot = new Shot(player.centerX(), player.centerY(), 5, 5);
            shots.push(shot);
          }, 100);
        }
    }
  });

  document.addEventListener("keyup", (event) => {
    const b = event.key;
    switch (b) {
      case " ":
        clearInterval(shotCreatingIntervalId);
        shotCreatingIntervalId = undefined;
    }
  });

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.height = height;
    canvas.width = width;
  });
}
function isIntersect(obj1, obj2) {
  const pyEnd = obj1.y + obj1.height;
  const pxEnd = obj1.x + obj1.width;
  const eyEnd = obj2.y + obj2.height;
  const exEnd = obj2.x + obj2.width;
  return !(
    eyEnd < obj1.y ||
    obj2.y > pyEnd ||
    exEnd < obj1.x ||
    obj2.x > pxEnd
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
      handleBreaking();
    }
  }
}
function shotKill() {
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < shots.length; j++) {
      const intersect = isIntersect(enemies[i], shots[j]);
      if (intersect) {
        enemies.splice(i, 1);
        shots.splice(j, 1);
        break;
      }
    }
  }
}
function handleBreaking() {
  lives--;
  if (lives === 0) {
    alert("Gg");
    reset();
  }
}

function reset() {
  enemies = createEnemies(width, height, enemyNumber);
  lives = INITIAL_LIVES;
  player.x = 50;
  player.y = height / 2 - player.height / 2;
  player.speedX = 0;
  player.speedY = 0;
}
function intervalCreateEnemies() {
  fillEnemies(enemies, width, height, 5);
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  drawBackground(ctx, tiles.bg, width, height);
  player.draw(ctx, tiles.player);
  drawShots(ctx, shots);
  enemies.forEach((element) => element.draw(ctx, tiles.enemy));
}

function mainTick() {
  updateShotsCoordinates(shots, width);
  player.updateCoordinates(width, height);
  enemies.forEach((element) =>
    element.updateCoordinates(width, height, handleBreaking)
  );
  draw();
  crashCheck();
  shotKill();
  window.requestAnimationFrame(mainTick);
}
function randomTick() {
  intervalCreateEnemies();
  setTimeout(randomTick, randomNumber(1, 6) * 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  await init();
  enemies = createEnemies(width, height, enemyNumber);
  mainTick();
  setupListeners();
  randomTick();
});
