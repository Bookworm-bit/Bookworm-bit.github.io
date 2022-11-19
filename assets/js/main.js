var player;
var door;

function startGame() {
    player = new component(30, 30, "red", 10, 120);
    door = new component(30, 10, "red", 10, 90);
    gameArea.start();
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            gameArea.key = e.key;
        })
        window.addEventListener('keydown', function(e) {
            gameArea.key = false;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.update = function() {
            ctx = gameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.move = function() {
            this.x += this.speedX;
            this.x += this.speedY;
        };
    }
}

function updateGameArea() {
    gameArea.clear();
    if (gameArea.key == "w") {
        moveUp();
    }
    if (gameArea.key == "s") {
        moveDown();
    }
    if (gameArea.key == "a") {
        moveLeft();
    }
    if (gameArea.key == "d") {
        moveRight();
    }
    player.update();
    door.update();
    player.newPos();
    // door.newPos();
}

function moveUp() {
    player.speedY -= 1;
}

function moveDown() {
    player.speedY += 1;
}

function moveLeft() {
    player.speedX -= 1;
}

function moveRight() {
    player.speedX += 1;
}

function stopMovement() {
    player.speedX = 0;
    door.speedX = 0;
    player.speedY = 0;
    door.speedY = 0;
}