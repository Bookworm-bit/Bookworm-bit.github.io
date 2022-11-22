// create a canvas
const canvas = document.createElement("canvas");

// fit canvas to the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// remove body margin
document.body.style.margin = "0";
// get rendering context
const ctx = canvas.getContext("2d");
// add canvas to the dom
document.body.appendChild(canvas);

class Player {
    constructor({ width, height, color, x, y }) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.color = color;

        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
        };

        this.bindKeyboardControls();

        this.speed = 2;
    }

    bindKeyboardControls() {
        /**
         * @param {KeyboardEvent} event
         */
        const keyboardFunc = ({ key, repeat, type }) => {
            // if shift is down key is upper case
            key = key.toLowerCase();
            // no repeat keys
            if (repeat) return;

            const down = type === "keydown" ? true : false;

            if (key === "arrowleft") {
                this.keys.left = down;
            } else if (key === "arrowright") {
                this.keys.right = down;
            } else if (key === "arrowup") {
                this.keys.up = down;
            } else if (key === "arrowdown") {
                this.keys.down = down;
            }
        };
        window.addEventListener("keydown", keyboardFunc);
        window.addEventListener("keyup", keyboardFunc);
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        // 0 speed
        this.speedX = 0;
        this.speedY = 0;

        if (this.keys.left) this.speedX -= 1;
        if (this.keys.right) this.speedX += 1;
        if (this.keys.up) this.speedY -= 1;
        if (this.keys.down) this.speedY += 1;

        if (this.speedX !== 0 && this.speedY !== 0) {
            this.speedX *= 1 / Math.SQRT2;
            this.speedY *= 1 / Math.SQRT2;
        }

        this.speedX *= this.speed;
        this.speedY *= this.speed;

        // update player from vel
        this.x += this.speedX;
        this.y += this.speedY;

        // limit player x and y
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
    }
}

const loop = () => {
    // clear
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    player.update();
    player.render();

    requestAnimationFrame(loop);
};

const player = new Player({
    x: 10,
    y: 120,
    width: 30,
    height: 30,
    color: "blue",
});

requestAnimationFrame(loop);
