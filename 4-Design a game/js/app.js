// Enemies our player must avoid
const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;

const X_RST_POS = 2;
const Y_RST_FACTOR = 42;

const PLAYER_INITIAL_X = CANVAS_WIDTH / 2 - 50;
const PLAYER_INITIAL_Y = CANVAS_HEIGHT / 2 + 50;

const MAX_LEVELS = 5;

var currentLevel = 1;

var Enemy = function (y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  this.width = 90;
  this.height = 60;

  this.x = 0;
  this.y = y;

  this.speedFactor = getRandomNumber();
};

function getRandomNumber () {
  return Math.floor((Math.random() * 150) + 50);
}

Enemy.prototype.speed = function () {
  return currentLevel * (Math.pow(2, currentLevel) + this.speedFactor);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.speed();

  if (this.x >= CANVAS_WIDTH) {
    this.x = -CANVAS_WIDTH / 2;
  }

  checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
  this.sprite = 'images/char-boy.png';

  this.width = 90;
  this.height = 60;

  this.x = x;
  this.y = y;
};

Player.prototype.update = function () {
  if (this.x >= (CANVAS_WIDTH - this.width)) {
    this.x = CANVAS_WIDTH - this.width;
  } else if (this.x < 0) {
    this.x = X_RST_POS;
  }

  console.log(this.y);
  if (this.y >= (CANVAS_HEIGHT - (this.height + 100))) {
    this.y = CANVAS_HEIGHT - (this.height + 150);
  }

// Player WON!
  if (this.y <= 0) {
    this.y = CANVAS_HEIGHT - this.height - Y_RST_FACTOR;
    currentLevel++;
    modifyLevel();
    playerWonGame();
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case 'left':
      this.x -= 50;
      break;
    case 'right':
      this.x += 50;
      break;
    case 'up':
      this.y -= 50;
      break;
    default:
      this.y += 50;
  }
  this.update();
};

function playerWonGame () {
  if (currentLevel >= MAX_LEVELS) {
    alertify.alert('YOU WON THE GAME!');
    resetGame();
  }
}

function resetGame () {
  currentLevel = 1;
  allEnemies.forEach(function (enemy) {
    enemy.x = 0;
  });

  player.x = PLAYER_INITIAL_X;
  player.y = PLAYER_INITIAL_Y;

  modifyLevel();
}

function modifyLevel () {
  alertify.maxLogItems(1).log("Current Level : " + currentLevel);
}

function checkCollisions (rect1) {
  var rect2 = player;

  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y) {
    resetGame();
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(PLAYER_INITIAL_X, PLAYER_INITIAL_Y);

var e1 = new Enemy(60);
var e2 = new Enemy(140);
var e3 = new Enemy(220);

var allEnemies = [e1, e2, e3];
allEnemies;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
