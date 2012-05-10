var pingpong = {
	scoreA: 0,
	scoreB: 0
};

pingpong.pressedKeys = [];

pingpong.ball = {
	diameter: 10,
	speed: 2,
	x: 150,
	y: 100,
	directionX: 1,
	directionY: 1
};


var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
};


function gameloop(){
	moveBall();
	movePaddles();
}

function moveBall(){
	var playgroundHeight = parseInt($Element("playground").height());
	var playgroundWidth = parseInt($Element("playground").width());
	var ball = pingpong.ball;

	if(ball.y + ball.speed * ball.directionY + ball.diameter > playgroundHeight){
		ball.directionY = -1;
	}

	if(ball.y + ball.speed * ball.directionY < 0){
		ball.directionY = 1;
	}

	if(ball.x + ball.speed * ball.directionX + ball.diameter > playgroundWidth){
		pingpong.scoreA++;
		$Element("scoreA").html(pingpong.scoreA);

		ball.x = 250;
		ball.y = 100;
		$Element("ball").css({
			"left": ball.x,
			"top": ball.y
		});
		ball.directionX = -1;
	}

	if(ball.x + ball.speed * ball.directionX < 0){
		pingpong.scoreB++;
		$Element("scoreB").html(pingpong.scoreB);

		ball.x = 250;
		ball.y = 100;
		$Element("ball").css({
			"left": ball.x,
			"top": ball.y
		});
		ball.directionX = 1;
	}

	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	var paddleAX = parseInt($Element("paddleA").css("left")) + parseInt($Element("paddleA").css("width"));
	var paddleAYBottom = parseInt($Element("paddleA").css("top")) + parseInt($Element("paddleA").css("height"));
	var paddleAYTop = parseInt($Element("paddleA").css("top"));

	if(ball.x + ball.speed * ball.directionX < paddleAX){
		if(ball.y + ball.speed * ball.directionY <= paddleAYBottom &&
			ball.y + ball.speed * ball.directionY >= paddleAYTop){
			ball.directionX = 1;
		}
	}

	var paddleBX = parseInt($Element("paddleB").css("left"));
	var paddleBYBottom = parseInt($Element("paddleB").css("top")) + parseInt($Element("paddleB").css("height"));
	var paddleBYTop = parseInt($Element("paddleB").css("top"));

	if(ball.x + ball.speed * ball.directionX >= paddleBX){
		if(ball.y + ball.speed * ball.directionY <= paddleBYBottom &&
			ball.y + ball.speed * ball.directionY >= paddleBYTop){
			ball.directionX = -1;
		}
	}

	$Element("ball").css({"left": ball.x, "top": ball.y});

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

