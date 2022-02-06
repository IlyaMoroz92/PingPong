const canvas = document.getElementById('pongGame');
const context = canvas.getContext('2d');

alert('Player One : W ↑ , S ↓ \nPlayer Two : O ↑ , L ↓')
let nameOne = prompt("Player One", 'Name');
let nameTwo = prompt("Player Two", 'Name');

let xx = 0.98*window.innerWidth;
let yy = 0.98*window.innerHeight;

canvas.width = xx;
canvas.height = yy;

let scoreOne = 0;
let scoreTwo = 0;

//key movement
window.addEventListener('keypress', doKeyDown, false)

function doKeyDown(event) {
    const key = event.code;
    if(key == 'KeyW' && playerOne.y - playerOne.gravity + playerOne.y > 0) {
        playerOne.y -= playerOne.gravity * 25;
    } else if (key == 'KeyS' && playerOne.y + playerOne.gravity + playerOne.height < canvas.height) {
        playerOne.y += playerOne.gravity * 25;
    }
    if(key == 'KeyO' && playerTwo.y - playerTwo.gravity + playerTwo.y > 0) {
        playerTwo.y -= playerTwo.gravity * 25;
    } else if (key == 'KeyL' && playerTwo.y + playerTwo.gravity + playerTwo.height < canvas.height) {
        playerTwo.y += playerTwo.gravity * 25;
    }
}

class Element {
    constructor(options) {
        this.x = options.x,
        this.y = options.y,
        this.width = options.width,
        this.height = options.height,
        this.color = options.color,
        this.speed = options.speed || 2,
        this.gravity = options.gravity;
    }
}

//first paddle-----------------------
const playerOne = new Element ({
    x: 10,
    y: yy/2 - 65,
    width: 15,
    height: 130,
    color: '#FF4500',
    gravity: 2,
});

//second paddle-----------------------
const playerTwo = new Element ({
    x: xx - 25,
    y: yy/2 - 65,
    width: 15,
    height: 130,
    color: '#FF4500',
    gravity: 2,
});

const field1 = new Element ({
    x: xx/2,
    y: 0,
    width: 2,
    height: yy,
    color: '#E0FFFF',
});

const field2 = new Element ({
    x: 0,
    y: yy/2,
    width: xx,
    height: 2,
    color: '#E0FFFF',
});

//ball-----------------------
const ball = new Element ({
    x: 650 /  2,
    y: 400 / 2,
    width: 20,
    height: 20,
    color: '#fff',
    gravity: 5,
    speed: 13,
});

// draw elements -----------------------
function drawElement(element) {
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height);
}

// Player one score
function displaycoreOne() {
    context.font = '38px Arial',
    context.fillStyle = '#fff',
    context.fillText(scoreOne, canvas.width / 2 -100, 40)
}

// Player two score
function displaycoreTwo() {
    context.font = '38px Arial',
    context.fillStyle = '#fff',
    context.fillText(scoreTwo, canvas.width / 2 +100, 40)
}

// Player one Name
function displayNameOne() {
    context.font = '38px Arial',
    context.fillStyle = '#fff',
    context.fillText(nameOne, canvas.width*.15 , 40)
}

// Player two Name
function displayNameTwo() {
    context.font = '38px Arial',
    context.fillStyle = '#fff',
    context.fillText(nameTwo, canvas.width*.75, 40)
}

//make ball bounce ----------------
function ballBounce() {
    if(ball.y + ball.gravity <= 0 || ball.y + ball.gravity + ball.height >= canvas.height) {
        ball.gravity = ball.gravity * (-1);
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
    ballWallColision()
}

//detect collision
function ballWallColision() {
    if (
        (ball.y + ball.gravity <= playerTwo.y + playerTwo.height && ball.x + ball.width + ball.speed >= playerTwo.x &&
        ball.y + ball.gravity >= playerTwo.y) ||
        (ball.y + ball.gravity >= playerOne.y && ball.x + ball.speed<= playerOne.x + playerOne.width && ball.y + ball.gravity <= playerOne.y + playerTwo.height)
        ) {
            ball.speed = ball.speed * (-1);
        } else if(ball.x + ball.speed < playerOne.x) {
            scoreTwo +=1;
            ball.speed = ball.speed * (-1);
            ball.x = 400 + ball.speed;
            ball.y += ball.gravity;
        } else if(ball.x + ball.speed > playerTwo.x + playerTwo.width) {
            scoreOne +=1;
            ball.speed = ball.speed * (-1);
            ball.x = xx/2 + ball.speed;
            ball.y += ball.gravity;
        }
    drawElements();
}

function drawElements() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(field1);
    drawElement(field2);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayNameOne()
    displayNameTwo()
    displaycoreOne();
    displaycoreTwo()
}
function loop() {
    ballBounce();
    window.requestAnimationFrame(loop)
}
loop()