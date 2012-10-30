/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	
	var imgUrl;
    var x = startX,
        y = startY,
		old_x = 0,
	    old_y = 0,
		flip = false,
        id,
		name,
		width =30,
		height = 30,
        moveAmount = 150,
		bodyParts = [1,1,1,1,1,1,1,1],
		img = new Image();
		
	var buffer = document.createElement('canvas');
	var cbuffer = buffer.getContext('2d');

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

    var getImg = function() {
        return img;
    };
    var setImg = function(newImg) {
        img = newImg;
		img.width=width;
		img.height=height;
    };

    var getName = function() {
        return name;
    };
    var setName = function(newName) {
        name = newName;
    };
	
    var setName = function(newName) {
        name = newName;
    };

    var update = function(Keys,delta, canvas) {
			old_x = x;
			old_y = y;
			flip = false;
			if(Keys.left) // Left
				x  -= ((x>=0) ? (moveAmount *  delta):0)
			if(Keys.up) // Left				break;
				y -= ((y>=0) ? (moveAmount *  delta):0);
			if(Keys.down) // Left
				y += ((y+height<=canvas.height) ? (moveAmount *  delta):0)
			if(Keys.right){ // Left
				x += ((x + width <= canvas.width )?(moveAmount *  delta) :0);
				flip = true;
			}
    };
	
	  var colision = function(object) {
    };

    var draw = function(ctx, delta) {
		 ctx.clearRect(old_x-1, old_y-1, width+2, height+2);
		 //ctx.clearRect(0,0,700,700);
		//ctx.fillRect(x,y,width,height);
		buffer = setRect();
		ctx.drawImage(buffer,x,y,width,height)
	}
	
	var setRect = function(){
		buffer.width = width;
		buffer.height = height;
		cbuffer.clearRect(0,0,width,height);
		
		if(img.src == ""){
			cbuffer.fillRect(0,0,width,height);
		}else{
			cbuffer.drawImage(img,0,0,width,height);
		}	
		return buffer;
	}
    // Draw player
   // var draw = function (ctx) {
     //   ctx.fillRect(real_x, real_y, 64,48);
    //};

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
		getImg: getImg,
		setImg: setImg,
		getName: getName,
		setName: setName,
        update: update,
        draw: draw,
		colision: colision
    }
};