
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
	bulletSpeed: 3,
	fps: 60
};

// Avatar profile data
var avatarState = {
	alive: "alive",
	dead: "dead"
}
var avatarProfile = {
	state: avatarState.alive,
	posX: 10,
	posY: 10,
	life: 100,
	speed: 3
}

var avatarBullets = [];
//var bullet = {
//	posX,
//	poxY,
//	angle,
//	speed
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
		angle: getAngle(avX, avY, mouseX, mouseY),//getAngle(avX, avY, mouseX, mouseY),Math.random() * Math.PI * 2,
		speed: 10
	}
	avatarBullets.push(bullet);
}

function getAngle(x0, y0, x1, y1) {
	var dX = x0 - x1;
	var dY = y0 - y1;/*
	if (dX = 0) {
		if (dY < 0) {
			return -Math.PI / 2;
		} else if (dY > 0) {
			return Math.PI / 2;
		} else {
			return Math.random() * 2 * Math.PI;
		}
	} else*/
	if (dY >= 0) {
		return Math.PI/2 + Math.atan2(dX, -dY);
	} else if (dY < 0) {
		return -(Math.PI/2 + Math.atan2(dX, dY));
	}
}

function calcBullets() {
	for (i in avatarBullets) {
		
		//var bX = avatarBullets[i].posX;
		//var bY = avatarBullets[i].posY;
		/*
		if (avatarBullets[i].posX < 0 || avatarBullets[i].posX > game.screenWidth) {
			avatarBullets[i].angle = Math.PI - avatarBullets[i].angle;
		}
		if (avatarBullets[i].posY < 0 || avatarBullets[i].posY > game.screenHeight) {
			avatarBullets[i].angle = -avatarBullets[i].angle;
		}
		*/
		avatarBullets[i].posX += Math.cos(avatarBullets[i].angle) * avatarBullets[i].speed;
		avatarBullets[i].posY += Math.sin(avatarBullets[i].angle) * avatarBullets[i].speed;
		
		//avatarBullets[i].posX += 5;
		//avatarBullets[i].posY += 5;
	}
}


function gameLoop() {
	$("canvas").clearCanvas();
	processKeys();
	drawBackground();
	drawAvatar();
	calcBullets();
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
	for (index in avatarBullets) {
		var bX = avatarBullets[index].posX;
		var bY = avatarBullets[index].posY;
		$("canvas").drawEllipse({
			fillStyle: "#d55",
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




// Network
function onlineUpdatePosition(posX, posY, angle) {
	$.getJSON(
	"/updatePosition.php", // The server URL to update position
	{ x: posX, y: posY, a: angle }, // Data sent to server
	localUpdatePosition // The function to call on completion.
	);
}

function localUpdatePosition(json) {
	// This function will update other avatars positions.
	// This function called after sending player's avatar position to server.
	alert(json);
}

// This ID parameter is sent by our javascript client.
//$id = $_GET['id'];

// Here's some data that we want to send via JSON.
// We'll include the $id parameter so that we
// can show that it has been passed in correctly.
// You can send whatever data you like.
//$data = array("Hello", $id);

// Send the data.
//echo json_encode($data);
