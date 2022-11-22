var player;

function startGame() {
    gameArea.start();
    player = new component(30, 30, "player.png", 10, 120, "image");
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1200;
        this.canvas.height = 540;
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
        window.addEventListener('mousemove', function(e) {
            gameArea.mouseCoords = (gameArea.mouseCoords || []);
            gameArea.mouseCoords[0] = e.screenX;
            gameArea.mouseCoords[1] = e.screenY;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.gamearea = gameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    // this.mouseRelativeAngle = Math.atan((this.gamearea.mouseCoords[0] - this.centerX) / (this.gamearea.mouseCoords[1] - this.centerY));
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.update = function() {
        ctx = gameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.width/-2, this.height/-2, this.width, this.height);
        ctx.restore();
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
    player.angle += 1 * Math.PI / 180;
    if (gameArea.keys && gameArea.keys["ArrowLeft"] || gameArea.keys && gameArea.keys["a"]) { player.speedX = -3; }
    if (gameArea.keys && gameArea.keys["ArrowRight"] || gameArea.keys && gameArea.keys["d"]) { player.speedX = 3; }
    if (gameArea.keys && gameArea.keys["ArrowUp"] || gameArea.keys && gameArea.keys["w"]) { player.speedY = -3; }
    if (gameArea.keys && gameArea.keys["ArrowDown"] || gameArea.keys && gameArea.keys["s"]) { player.speedY = 3; }
    if (player.x + player.speedX > 0 && player.y + player.speedY > 0 && player.x + player.speedX < 1200 - player.width && player.y + player.speedY < 540 - player.height) {
        player.move();
    }
    player.update();
}