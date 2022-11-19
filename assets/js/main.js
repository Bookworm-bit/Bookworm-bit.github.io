var player;

function startGame() {
    gameArea.start();
    player = new component(30, 30, "blue", 10, 120);
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
        window.addEventListener('keyup', function(e) {
            gameArea.key = false;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = gameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.move = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    gameArea.clear();
    player.speedX = 0;
    player.speedY = 0;
    if (gameArea.key && gameArea.key == "left" || gameArea.key && gameArea.key == "a") { player.speedX = -1; }
    if (gameArea.key && gameArea.key == "right" || gameArea.key && gameArea.key == "d") { player.speedX = 1; }
    if (gameArea.key && gameArea.key == "up" || gameArea.key && gameArea.key == "w") { player.speedY = -1; }
    if (gameArea.key && gameArea.key == "down" || gameArea.key && gameArea.key == "s") { player.speedY = 1; }
    player.move();
    player.update();
}