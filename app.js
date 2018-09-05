// Calling the global .render, .reset methods and Player.prototype.update method this way
// was inspired by danceoval's code (https://github.com/danceoval/frogger)
// Various aspects  of the Player class inspired by AmitP88 (https://github.com/AmitP88/Arcade-Game)
// A lot of code was inspired by various solutions available on the Udacity Forum as well.


// Draw Enemies and the Player onto the screen, required method for game
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset method to bring Player to Start Position upon
// colliding with enemies or reaching the water
Object.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
};


// Enemy Class
var Enemy = function(x,y,movement,direction) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Enemies Location and Speed on the screen
    this.x = x;
    this.y = y;
    //Enemy movement across the screen
    this.movement = 100 + Math.floor(Math.random() * 150);
    this.direction = 1;
};

// Enemy position and direction -
Enemy.prototype.move = function (dt) {
    if (this.direction === "left") {
        this.x = this.x - (dt * this.movement);
    } else if (this.direction === "right") {
        this.x = this.x + (dt * this.movement);
    }
};

// Update the enemy's position and loop when it goes off the canvas, required method for game
// Parameter: dt, a time delta between ticks - will
// ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {

    this.x = this.x + (this.movement * dt * this.direction);
    this.checkCollision(player);
    if (this.x > 1300) {
        this.x = -200;
    }

};

Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 80 &&
        player.x + 75 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        player.reset();
    }
};


// The Player class
var Player = function () {

    this.sprite = 'images/char-boy.png';

    //Location
    this.x = 200;
    this.y = 400;

};

//Update Player position according to Keys Pressed
Player.prototype.update = function(){
        //Left Arrow key
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - 40;
        //Right Arrow key
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 40;
        //Up Arrow key
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 40;
        //Down Arrow key
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 40;
    }
    this.ctlKey = null;

    //Reset the Game when on Water
    if(this.y < 25){
        this.reset();
    }
};

//handleInput() method for the Player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};

// Instantiate all objects.
// All enemy objects in an array called allEnemies
// setTimeout acts a delay for Enemy Re-spawning
var allEnemies = [];
for (var i = 0; i < 3; i++){
    setTimeout(function(){
        allEnemies.push(new Enemy(-200, 60));
    }, 500);
    setTimeout(function() {
        allEnemies.push(new Enemy(-250, 150));
    }, 1500);
    setTimeout(function() {
        allEnemies.push(new Enemy(-300, 230));
    }, 2500);
}

// Player object in a variable called player
var player = new Player();

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