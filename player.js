export function Player() {
  this.width = 32;
  this.height = 32;
  this.speedX = 0;
  this.speedY = 0;
  this.speed = 30;
  this.x = 50;
  this.y = 0;
  this.updateCoordinates = function (width, height) {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    if (this.x > width - this.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width - this.width;
    }
    if (this.y > height - this.width) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height - this.width;
    }
  };
  this.centerX = function () {
    return this.x + this.width / 2;
  };
  this.centerY = function () {
    return this.y + this.height / 2;
  };
  this.draw = function (ctx, image, width, height) {
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
}
