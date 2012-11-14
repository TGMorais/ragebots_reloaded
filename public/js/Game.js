//Game variables
var Game = function(){
	var localPlayer,
		remotePlayers = [],
		canvas,
		ctx,
		lastRun,
		keys;
		
	var show_fps = true,
		inc = 0;
	
	// START NEW GAME	
	this.GameStart = function(){
		ctx = initCanvas();
		keys = initInput();
		if(localPlayer){
			//begin game loop
			lastRun =  new Date().getTime();
			loop();
		}
		else
			console.log('player not set')
	}

	//SET LOCAL PLAYER
	this.setLocalPlayer = function(img){
		var startX = Math.round(Math.random()*(canvas.width-5)), startY = Math.round(Math.random()*(canvas.height-5));
		var localPlayer = new Player(startX, startY);
		localPlayer.setImg(rsxManager.getItem(img));
	}
		
	// INIT CANVAS
	function initCanvas(){
		  window.requestAnimFrame = (function(callback) {
			return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			function(callback) {
			  window.setTimeout(callback, 1000 / 60);
			};
		  })();
		  
 		$("#container").width(window.innerWidth/2+300) 

		//window.addEventListener('resize', resizeGame, false);
		canvas = document.getElementById("gameCanvas");
		canvas.width = $("#container").width();
		canvas.height = $("#container").height(); 
		
		ctx = canvas.getContext("2d");
		
		
		return ctx;
	}
	function initInput(){
		keys = new Keys();
		
		window.addEventListener("keydown", onKeydown, false);
		window.addEventListener("keyup", onKeyup, false);
		return keys;
	}

//EVENTS
	// Keyboard key down
	function onKeydown(e) {
		if (localPlayer) {
			keys.onKeyDown(e);
		};
	};

	// Keyboard key up
	function onKeyup(e) {
		if (localPlayer) {
			keys.onKeyUp(e);
		};
	};

	
	function loop(){
		//update
		var delta = (new Date().getTime() - lastRun)/1000;
		lastRun = new Date().getTime();
		fps = 1/delta;
		
		localPlayer.update(keys, delta, canvas);
		
		for(var p=0;p<remotePlayers.length;p++){
			remotePlayers[p].update(keys,delta,canvas);
		}
		
		//go around
		window.requestAnimFrame(loop);
		inc += 1;
		
		//draw
		
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(show_fps) {/*console.log("FPS:" +  fps + " DELTA: " + delta + "ms - " + inc); */drawFPS();}
		localPlayer.draw(ctx);
		
		for(var p=0;p<remotePlayers.length;p++){
			remotePlayers[p].draw(ctx);
		}

	
	}
	
	function drawFPS(){
		ctx.fillStyle = "Black";
		ctx.font = "normal 16px Arial";
		ctx.clearRect(10,14,66,15)
		ctx.fillText(Math.round(fps) + " fps", 10, 26);
	}
	
	function resizeGame(e){
		$("#container").width(window.innerWidth/2+300)
		canvas = document.getElementById("gameCanvas");
		canvas.width = $("#container").width();
		canvas.height = $("#container").height(); 
	}
}
