const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
const foodImg = new Image();

ground.src = 'gameField.png';
foodImg.src = 'food.png';
let xSnake = 0;
let box = 32;
let score = 0;
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};
let dir;

document.addEventListener('keydown', direction);

function randomFood(snake) {
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };
    for (let i = 0; i < snake.length; i++) {
        if(snake[i].x == food.x && snake[i].y == food.y){
            randomFood(snake);
        }
    }
    return food;
}

function direction(e) {
    if (e.keyCode == 37 && dir != 'right') dir = 'left';
    else if (e.keyCode == 38 && dir != 'down') dir = 'up';
    else if (e.keyCode == 39 && dir != 'left') dir = 'right';
    else if (e.keyCode == 40 && dir != 'up') dir = 'down';
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            // document.getElementById('b').click();
        }
    }
}

function drawGame(snakes) {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX < box) {
        console.log(snake);
        for (let i = 0; i < snake.length; i++) {
            snakes[i].x = snake[i].x + box * 17;
            drawGame(snakes);
        }
    } else if (snakeX > box * 17) {
        for (let i = 0; i < snake.length; i++) {
            snakes[i].x = snake[i].x - box * 17;
            drawGame(snakes);
        }
    } else if (snakeY < 3 * box  || snakeY > box * 17) {
        console.dir(123);
        clearInterval(game);
        // document.getElementById('b').click();
    } else {
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i == 0 ? 'red' : 'green';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = randomFood(snake);
    } else {
        snake.pop();
    }


    if (dir == 'left') snakeX  -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 150);
