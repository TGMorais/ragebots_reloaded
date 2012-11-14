function initPage(){
	$("#container").hide();
	$("#login").show();
	$("#email").focus();
	//startGame();	
}			
			
function validate(){
	logged = false;
	var email = $('#emailinput').val();  
	var pwd = $('#passwordinput').val(); 
	$("#loginerr").fadeOut()
	
	if(email.toLowerCase() == 'guest' && pwd == '123')
	{
		var demosprite = "assets/sprites/master.png"
		//load assets
		LoadAssets(function(){
			startGame(demosprite);
		});	
	}
	else if (validateEmail(email)){
		var jsonresp = $.getJSON("https://services.sapo.pt/Codebits/gettoken?user="+email+"&password="+pwd+"&callback=?",
		function(data) {
			if(data.error == undefined){
				var ops = parseData(data);
				LoadAssets(function(){
					startGame(ops);
				});	
			}
			else{
				$("#loginerr").fadeIn()
			}
		 });
	}
	else{
		$("#loginerr").fadeIn()
	}
}

function parseData(data){
	$.ajax({
	 type: "GET",
	 url: "https://services.sapo.pt/Codebits/botuser/"+escape(data.uid),
	 dataType: "jsonp",

		success: function(bot){
			var url = "https://codebits.eu"+bot.botfile                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
			//player.setImg(url);
			//$("#user").append("<img src= '"+url+"'></img><div class='name'>"+player.getName()+"</div>");
			//$("#usersplaying").append("<li id="+player.getName()+"><div class='score'>1</div><img src='"+url+"'></img><div class='name'>"+player.getName()+"</div></li>");
			//socket = io.connect('/');
			// Start listening for events
			//setEventHandlers();
		//	$("#usersplaying").append("<li id="+player.getName()+"><div class='score'>1</div><img src='"+player.getImg()+"'></img><div class='name'>"+player.getName()+"</div></li>");
			
			// "https://services.sapo.pt/Codebits/botmake/"+getUrlBot(bot);
			
		//	$("#loginform").append('<img id="botimage" src='+url +' />')
		}
	})
}
function startGame(ops){
	ragebots = new Game();
	if(ops){
		ragebots.setLocalPlayer(ops);
	}
	
	setTimeout(function(){
		$("#login").fadeOut('slow',function(){$("#container").show('slow')});
		ragebots.GameStart();	
	}, 500);	
	
	//Start the game

}

		
//LOAD GAME ASSETS on login
function LoadAssets(callback){
	//
	var queue;
	
	queue = [
		"assets/sprites/master.png",
		"assets/sprites/bullets.png",
		"assets/sprites/bullet.png"
	];
	
	rsxManager = new AssetManager(queue);
	rsxManager.onprogress(function(count){
			$(".progress .bar").css("width",count + "%");
		});
	rsxManager.onfinish(function(){
			callback();
		});
	
	//
	$(".auth-details").fadeOut('fast');
 	$(".footer").fadeOut('fast',function(){
		$(".loading").fadeIn('fast', function(){
			rsxManager.loadAssets();
		});
	})	
}
		
function validateEmail(elementValue){  
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
   return emailPattern.test(elementValue);  
 }
 
