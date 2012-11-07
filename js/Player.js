/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, bw, bh) {
	
	var imgUrl;
    var x = startX,
        y = startY,
		old_x = 0,
	    old_y = 0,
		flip = 0,
        id = 1,
		name,
		width =31,
		height = 30,
        moveAmount = 150,
		bodyParts = [1,1,1,1,1,1,1,1],
		bullets = [],
		reloadtime = 0.3,
		lastshot = reloadtime,
		img = new Image();
		
	var buffer = document.createElement('canvas');
	buffer.width=width
	buffer.height=height
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
		if(Keys.left){ // Left
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
		}
		if(Keys.space){
			var now = new Date().getTime();
			if(((now - lastshot)/1000) >= reloadtime){
				//console.log('time passed: ' + ((now - lastshot)/1000) + ' reloadtime: ' +reloadtime)
				var nb = new Bullet(midPoint()._x,midPoint()._y,id,flip);
				nb.setImg(rsxManager.getItem("assets/sprites/bullets.png"))
				bullets.push(nb);
				lastshot = new Date().getTime();
			}
		}
		 x = (x + .5) | 0;
		 y = (y + .5) | 0
			 
		//update bullets
		for(a = 0; a< bullets.length;a++){
			var b = bullets[a];
			b.update(delta,canvas,flip);
 			if(!b.isInBounds()){
				b.die();
				console.log('bullet died')
			} 
		}
    };
	
	var colision = function(object) {
    };

    var draw = function(ctx, delta) {
		ctx.clearRect(old_x-1, old_y-1, width+2, height+2);
		//ctx.clearRect(0,0,700,700);
		//ctx.fillRect(x,y,width,height);
		buffer = setRect();
		ctx.drawImage(buffer,x,y);
		
		//draw bullets
		for(a = 0; a< bullets.length;a++){
			var b = bullets[a];
			b.draw(ctx);
			if(!b.isAlive()){
				bullets.splice(a,1);
				a--
			}
		}
	}

	var setRect = function(){
		cbuffer.clearRect(0,0,bw,bh);
		if(img.src == "" || id>=25){
			cbuffer.fillRect(0,0,width,height);
		}else{
			cbuffer.drawImage(img,width*id,flip,width,height,0,0,width,height);
		}	
		return buffer;
	}
	
	//get bullet exit point
	var midPoint =  function(){
		var _x = (flip<30) ? x  : x+width;
		var _y = y +(height/2);
		return{
			_x : _x,
			_y : _y
		}
	}

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