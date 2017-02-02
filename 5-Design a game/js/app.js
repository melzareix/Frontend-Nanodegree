// Enemies our player must avoid
'use strict';
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;

var X_RST_POS = 2;
var Y_RST_FACTOR = 42;

var ADJUST_VALUE = 50;

var PLAYER_INITIAL_X = CANVAS_WIDTH / 2 - ADJUST_VALUE;
var PLAYER_INITIAL_Y = CANVAS_HEIGHT / 2 + ADJUST_VALUE;

var MAX_LEVELS = 5;

var currentLevel = 1;

// Character Superclass.
var Character = function(x, y, sprite, width, height) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.width = width;
  this.height = height;
};

// Draw the character on the screen.
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function(y) {
  Character.call(this, 0, y, 'images/enemy-bug.png', 90, 60);
  this.speedFactor = this.getRandomNumber();
};
Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.getRandomNumber = function() {
  return Math.floor((Math.random() * 150) + ADJUST_VALUE);
};

Enemy.prototype.speed = function() {
  return currentLevel * (Math.pow(2, currentLevel) + this.speedFactor);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  this.x += dt * this.speed();

  if (this.x >= CANVAS_WIDTH) {
    this.x = -CANVAS_WIDTH / 2;
  }

  this.checkCollisions(player);
};

Enemy.prototype.checkCollisions = function(player) {
  if (player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.height + player.y > this.y) {
    player.reset();
  }
};


var Player = function(x, y) {
  Character.call(this, x, y, 'images/char-boy.png', 90, 60);
  this.speed = ADJUST_VALUE;
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.update = function() {
  if (this.x >= (CANVAS_WIDTH - this.width)) {
    this.x = CANVAS_WIDTH - this.width;
  } else if (this.x < 0) {
    this.x = X_RST_POS;
  }

  if (this.y >= (CANVAS_HEIGHT - (this.height + 100))) {
    this.y = CANVAS_HEIGHT - (this.height + 150);
  }

  // Player WON!
  if (this.y <= 0) {
    this.y = CANVAS_HEIGHT - this.height - Y_RST_FACTOR;
    currentLevel++;
    this.modifyLevel();
    this.win();
  }
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x -= this.speed;
      break;
    case 'right':
      this.x += this.speed;
      break;
    case 'up':
      this.y -= this.speed;
      break;
    default:
      this.y += this.speed;
  }
  this.update();
};

Player.prototype.win = function() {
  if (currentLevel >= MAX_LEVELS) {
    alertify.alert('YOU WON THE GAME!');
    this.reset();
  }
};

Player.prototype.reset = function() {
  currentLevel = 1;
  allEnemies.forEach(function(enemy) {
    enemy.x = 0;
  });

  this.x = PLAYER_INITIAL_X;
  this.y = PLAYER_INITIAL_Y;

  this.modifyLevel();
};

Player.prototype.modifyLevel = function() {
  alertify.maxLogItems(1).log('Current Level : ' + currentLevel);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(PLAYER_INITIAL_X, PLAYER_INITIAL_Y);

var e1 = new Enemy(60);
var e2 = new Enemy(140);
var e3 = new Enemy(220);

var allEnemies = [e1, e2, e3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
