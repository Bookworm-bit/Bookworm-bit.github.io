var player;

function startGame() {
    gameArea.start();
    player = new component(30, 30, "blue", 10, 120);
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1200;
        this.canvas.height = 740;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.key] = true;
        })
        window.addEventListener('keyup', function(e) {
            gameArea.keys[e.key] = false;
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
    if (gameArea.keys && gameArea.keys["ArrowLeft"] || gameArea.keys && gameArea.keys["a"]) { player.speedX = -5; }
    if (gameArea.keys && gameArea.keys["ArrowRight"] || gameArea.keys && gameArea.keys["d"]) { player.speedX = 5; }
    if (gameArea.keys && gameArea.keys["ArrowUp"] || gameArea.keys && gameArea.keys["w"]) { player.speedY = -5; }
    if (gameArea.keys && gameArea.keys["ArrowDown"] || gameArea.keys && gameArea.keys["s"]) { player.speedY = 5; }
    if (player.x + player.speedX > 0 && player.y + player.speedY > 0 && player.x + player.speedX < 1200 - player.width && player.y + player.speedY < 740 - player.height) {
        player.move();
    }
    player.update();
}