var pingpong = {};

pingpong.pressedKeys = [];


var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
};


function gameloop(){
	movePaddles();
}

function movePaddles(){
	if(pingpong.pressedKeys[KEY.UP]){
		var top = parseInt($Element("paddleB").css("top"));
		$Element("paddleB").css("top", top-5);
	}
	if(pingpong.pressedKeys[KEY.DOWN]){
		var top = parseInt($Element("paddleB").css("top"));
		$Element("paddleB").css("top", top+5);
	}
	if(pingpong.pressedKeys[KEY.W]){
		var top = parseInt($Element("paddleA").css("top"));
		$Element("paddleA").css("top", top-5);
	}
	if(pingpong.pressedKeys[KEY.S]){
		var top = parseInt($Element("paddleA").css("top"));
		$Element("paddleA").css("top", top+5);
	}
}


function init(){
	pingpong.timer = setInterval(gameloop, 30);

	$Element(document).attach("keydown", function(e){
		pingpong.pressedKeys[e.key().keyCode] = true;
	});

	$Element(document).attach("keyup", function(e){
		pingpong.pressedKeys[e.key().keyCode] = false;
	});

}




init();

