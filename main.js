
// Mouse events handlers
var mousePointer;

function setMouseCoords(event) {
    if (event.offsetX !== undefined && event.offsetY !== undefined)  mousePointer = { x: event.offsetX, y: event.offsetY };
    mousePointer = { x: event.layerX, y: event.layerY };
}

// Game settings
var game = {
	screenWidth: 640,
	screenHeight: 480,
	bulletSpeed: 10,
	fps: 60
};

// Avatar profile data
var avatarState = {
	alive: "alive",
	dead: "dead"
}
var avatarProfile = {
	state: avatarState.dead,
	posX: 10,
	posY: 10,
	life: 100,
	speed: 3
}

var avatarBullets = [];
//var bullet = {
//	posX,
//	poxY,
//	angle
//}


function onMouseClick() {
	if (avatarProfile.state == avatarState.alive) {
		avatarShoot(mousePointer.x, mousePointer.y);
	} else if (avatarProfile.state == avatarState.dead) {
		// Do nothing while dead
	}
}

function avatarShoot(mouseX, mouseY) {
	var avX = avatarProfile.posX;
	var avY = avatarProfile.posY;
	var bullet = {
		posX: avX,
		posY: avY,
		angle: getAngle(avX, avY, mouseX, mouseY)
	}
	avatarBullets.push(bullet);
}

function getAngle(x0, y0, x1, y1) {
	var dX = x0 - x1;
	var dY = y0 - y1;
	if (dX = 0) {
		if (dY < 0) {
			return -Math.PI / 2;
		} else if (dY > 0) {
			return Math.PI / 2;
		} else {
			return Math.random() * 2 * Math.PI;
		}
	} else if (dX > 0) {
		return Math.atan2(dX, dY);
	} else if (dX < 0) {
		return Math.PI - Math.atan2(-dX, dY);
	}
}

function calcBullets() {
	for (var i = 0; i < dots.length; i++) {
		if (dots[i].x < 0 || dots[i].x > game.screenWidth) {
			dots[i].angle = Math.PI - dots[i].angle;
		}
		if (dots[i].y < 0 || dots[i].y > game.screenHeight) {
			dots[i].angle = -dots[i].angle;
		}
		dots[i].x = dots[i].x + Math.cos(dots[i].angle) * game.currentDotsSpeed;
		dots[i].y = dots[i].y + Math.sin(dots[i].angle) * game.currentDotsSpeed;
	}
}


function gameLoop() {
	$("canvas").clearCanvas();
	processKeys();
	drawBackground();
	drawAvatar();
	drawBullets();
}

gLoop = setInterval(gameLoop, 1000/game.fps );

var keyUp = false;
var keyDown = false;
var keyLeft = false;
var keyRight = false;

function processKeys() {
	if (keyUp)
    {
        avatarProfile.posY -= avatarProfile.speed; //going up
    }
    if (keyDown)
    {
        avatarProfile.posY += avatarProfile.speed; //going down
    }
    if (keyLeft)
    {
        avatarProfile.posX -= avatarProfile.speed; //going left
    }
    if (keyRight)
    {
        avatarProfile.posX += avatarProfile.speed; //going right
    }
}

function drawBackground() {
	$("canvas").drawRect({
		layer: true,
		fillStyle: "#EEE",
		x: 0, y: 0,
		width: game.screenWidth,
		height: game.screenHeight,
		fromCenter: false,
		click: function(layer) {
			onMouseClick();
		}
	});
}

function drawAvatar() {
	var avX = avatarProfile.posX;
	var avY = avatarProfile.posY;
	$("canvas").drawEllipse({
		fillStyle: "#c33",
		x: avX, y: avY,
		width: 15, height: 15
	});
}

function drawBullets() {
	for (var index in avatarBullets) {
		var bX = avatarBullets[index].posX;
		var bY = avatarBullets[index].posY;
		$("canvas").drawEllipse({
			fillStyle: "#f55",
			x: bX, y: bY,
			width: 5, height: 5
		});
	}
}

$(document).bind("keydown", function(event) { 
	if (event.keyCode == 38)
    {
        keyUp = true;
    }
    if (event.keyCode == 40)
    {
        keyDown = true;
    }
    if (event.keyCode == 37)
    {
        keyLeft = true;
    }
    if (event.keyCode == 39)
    {
        keyRight = true;
    }
});

$(document).bind("keyup", function(event) { 
	if (event.keyCode == 38)
    {
        keyUp = false;
    }
    if (event.keyCode == 40)
    {
        keyDown = false;
    }
    if (event.keyCode == 37)
    {
        keyLeft = false;
    }
    if (event.keyCode == 39)
    {
        keyRight = false;
    }
});
