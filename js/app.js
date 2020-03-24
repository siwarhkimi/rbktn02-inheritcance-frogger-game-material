// Enemies our player must avoid
/*
   Inside the app.js file, you will need to implement the Player and the Enemy classes, using Object-Oriented JavaScript. Part of the code for the Enemy is provided to you, and you will need to complete the following:
   *	The Enemy function, which initiates the Enemy by:
   *	Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
   *	The update method for the Enemy
   *	Updates the Enemy location (you need to implement)
   *	EXTRA: RANDOMIZES ENEMY RE-START SPEED
   *	              //TODO: MAKE ENEMIES DO NOT COINCEDE IN ROW 
   *	Handles collision with the Player (you need to implement)	
   *	You can add your own Enemy methods as needed
 */

var Enemy = function(sens, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    if(y > 430){
        this.y = y - 430
    }
     else{
         this.y = y
     }
    
    this.x = sens+1 && 400
    
    this.speed = sens*Math.random() * 150
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png' ;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
      
    this.x += this.speed * dt;
    if(Math.ceil(this.x) > 400) { 
      this.x=0;
    }
    if(Math.ceil(this.x) < 0) { 
        this.x=400;
    }
    if(Math.abs(player.x - this.x) < 40 && Math.abs(player.y - this.y) < 40) {
        
        player.x = 200;
        player.y = 430;
    }
    
  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 200 ;
    this.y = 430 
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png' ;
};
Player.prototype.update = function() {
    // this.y -= 3 
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(direction) {
    if(direction === 'left'  && this.x > 0) {
        this.x -= 50;
    } else if(direction === 'right'&& this.x < 400) {
        this.x += 50;
    }
    else if(direction === 'up' && this.y >0) {
        var that = this;
        this.y -= 50;
        if(this.y === -20){
            setTimeout(function(){
                that.x = 200;
                that.y = 430;
            },300)
            
        }
    }
    else if(direction === 'down' && this.y < 430) {
        this.y += 50;
    }
}
//0<y<430
//0<x<400

var allEnemies = [new Enemy (1,20), new Enemy (-1,120), new Enemy(1,220), new Enemy(-1, 320)]
var player = new Player()
var allPlayer = [player]
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
