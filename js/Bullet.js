/**************************************************
** GAME BULLET CLASS
**************************************************/
var Bullet = function(startX, startY, playerID, flip) {
	
	var imgUrl;
    var x = startX,
        y = startY,
		old_x = 0,
	    old_y = 0,
		width =5,
		height = 5,
        moveAmount = 250,
		alive = true,
		inBounds = true,
		xVel = (flip>0) ? moveAmount : -moveAmount,
		bowner = playerID,
		img = new Image();
		
/* 	var buffer = document.createElement('canvas');
	buffer.width=width
	buffer.height=height
	var cbuffer = buffer.getContext('2d'); */

    // Getters and setters
    var getX = function () {
        return x;
    };

    var getY = function() {
        return y;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

/*     var getImg = function() {
        return img;
    }; */
    var setImg = function(newImg) {
        img = newImg;
    };
	
	var isAlive = function(cw){
		return alive;
	}
	
	var isInBounds = function(cw){
		return inBounds;
	}
	
	
    var update = function(delta,canvas) {
			old_x = x;
			old_y = y;
			x +=(xVel *  delta)
/* 			if(Keys.left){ // Left
				x  -= ((x>=0) ? (moveAmount *  delta):0)
				flip = 0;
			}
			if(Keys.up) // Left				break;
				y -= ((y>=0) ? (moveAmount *  delta):0);
			if(Keys.down) // Left
				y += ((y+height<=canvas.height) ? (moveAmount *  delta):0)
			if(Keys.right){ // Left
				x += ((x + width <= canvas.width )?(moveAmount *  delta) :0);
				flip = 30;
			} */
			 x = (x + .5) | 0;
			 y = (y + .5) | 0;
			 
		inBounds = ((x>=0 && (x+width <= canvas.width)));
    };
	
	 var colision = function(object) {
    };

    var draw = function(ctx) {
		ctx.clearRect(old_x-1, old_y-1, width+2, height+2);
		if(alive) ctx.fillRect(x,y,width,height);
		//ctx.drawImage(img,width*id,flip,width,height,0,0,width,height);
	}

	var die = function(){
		alive = false;
	}

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
		setImg: setImg,
        update: update,
		isAlive: isAlive,
		isInBounds: isInBounds,
		die: die,
        draw: draw,
		colision: colision
    }
};