/**************************************************
** GAME BULLET CLASS
**************************************************/
var Bullet = function(startX, startY, playerID, flip) {
	
	var imgUrl;
    var x = startX,
        y = startY,
		old_x = 0,
	    old_y = 0,
		width =14,
		height = 12,
        moveAmount = 250,
		alive = true,
		inBounds = true,
		msPerFrame = 25,
		acDelta = 0,
		lastUpdate = 0,
		xVel = (flip>0) ? moveAmount : -moveAmount,
		frame = (flip<30) ? 4 : 5,
		drawOffset = (flip<30)? width : 0
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
 			 x = (x + .5) | 0;
			 y = (y + .5) | 0;
			 /*
			 if(acDelta > msPerFrame){
				acDelta = 0;
				frame++;
				if(frame > 5) frame = 0;
			 }
			 else{
				acDelta += (delta*100);
				console.log(acDelta);
			 } */

		inBounds = ((x>=0 && (x+width <= canvas.width+width)));
    };
	
	 var colision = function(object) {
    };

    var draw = function(ctx) {
		//ctx.clearRect(old_x-1, old_y-1, width+2, height+2);
		ctx.clearRect(old_x-1-(drawOffset), old_y-1-(height/2), width+2, height+2);
		//if(alive) ctx.fillRect(x,y,width,height);
		ctx.drawImage(img,13*frame,0,width,height,x-(drawOffset),y-(height/2),width,height);
		//ctx.drawImage(img,x,y,24,12); 
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