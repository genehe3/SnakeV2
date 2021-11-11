let canvas = document.getElementById('canvas'); //easy reference to canvas element
let ctx = canvas.getContext('2d'); // "brush"

//need a function which returns the highest multiple of twenty.
const lowestTwenty = (num) => {
    let answer = parseInt(num / 20);
    return answer;
}

console.log(lowestTwenty(405))

//set width and height of canvas
canvas.width = lowestTwenty(window.innerWidth) * 20 - 20;
canvas.height = lowestTwenty(window.innerHeight) * 20 - 100 ;



let xCenter = Math.floor(300); //horizontal center
let yCenter = Math.floor(300); //veritical center

dx = 0; //horizontal "velocity"
dy = 0; //veritocal "velocity"

let pause = true;

let fruit = false;

let score = 0;

let fruitPos = [];

let curPos = [xCenter, yCenter] //starts at the center(snake head)

let Length = 3; //total length of snake, starts at 3

let bodyPos = [] //position of body

let grid = 20; //grid size, also determines how far one step is

//moved to top
const drawFruit = (fruitX, fruitY) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(fruitX, fruitY, grid - 2, grid - 2)
}

const randLoc = () => {
    fruit = true;
    fruitPos.push(Math.floor((Math.random() * 20) * lowestTwenty(canvas.width))); //random location on x plane
    fruitPos.push(Math.floor((Math.random() * 20) * lowestTwenty(canvas.height)));//random location on y plane
    console.log(fruitPos);
    drawFruit(fruitPos[0], fruitPos[1]);
} //working

//draw a rectangle, red and starts at the center. Function form will be useful
const draw = (x, y) => {
    ctx.fillStyle = 'red' //colors it red
    bodyPos.push(x, y);
    ctx.fillRect(x, y, grid, grid);
    if (bodyPos.length > Length * 2) {
        let removedX = bodyPos.shift();
        let removedY = bodyPos.shift();
        ctx.clearRect(removedX, removedY, grid, grid);
    if (curPos[0] + 20 === fruitPos[0]) {
        ctx.clearRect(fruitPos[0], fruitPos[1], grid -2, grid - 2)
        fruit = false;
        Length++;
        randLoc();
    }
    }// draws it at the center with side length 20px 
    
    if (curPos[0] >= canvas.width) {
        //check for wall, horizontally
        curPos[0] = 0;
    }

    if (curPos[0] <= 0) {
        //check for wall, horizontally
        curPos[0] = canvas.width;
    }

    if (curPos[1] <= 0) {
        curPos[1] = canvas.height;
    }

    if (curPos[1] >= canvas.height) {
        curPos[1] = 0;
    }
}
draw(xCenter, yCenter); //calls function; working

//need a way of knowing where the head of the snake is, an array is used to store xy coordinates

//key detection 
document.addEventListener('keydown', (dir) => {
    let keyCode = dir.key; //value of the key pressed
    //console.log(keyCode);
    if (pause === true) {
        //does nothing if paused, except for unpausing
        if (keyCode === ' ') {
            pause = false;
            document.getElementById('gameState').innerHTML = 'Playing.'
        } else {
            return;
        }
    } else {
    switch (keyCode) {
        case ' ':
            pause = true;
            document.getElementById('gameState').innerHTML = 'Paused. Press SPACE to start.'
            break;
        case 'ArrowUp':
            //takes y coordinate, moves one "grid" and draws it there
            curPos[1] = curPos[1] - grid;
            dy = -1;
            dx = 0;
            draw(curPos[0], curPos[1])
            break;
        
        case 'ArrowRight':
            curPos[0] = curPos[0] + grid;
            dx = 1;
            dy = 0;
            draw(curPos[0], curPos[1])
            break;

        case 'ArrowDown':
            curPos[1] = curPos[1] + grid;
            dy = 1;
            dx = 0;
            draw(curPos[0], curPos[1])
            break;

        case 'ArrowLeft':
            curPos[0] = curPos[0] - grid;
            dx = -1;
            dy = 0;
            draw(curPos[0], curPos[1])
            break;
    }
}
})//working

//need to automatically move snake when unpaused
const move = () => {
    if (pause === true) {
        return;
    } else {
        if (dy === -1) {
            //moving UP
            curPos[1] = curPos[1] - grid;
            draw(curPos[0], curPos[1])
        }

        if (dx === 1) {
            //moving RIGHT
            curPos[0] = curPos[0] + grid;
            draw(curPos[0], curPos[1])
        }

        if (dy === 1) {
            //moving DOWN
            curPos[1] = curPos[1] + grid;
            draw(curPos[0], curPos[1])
        }
        if (dx === -1) {
            //moving LEFT
            curPos[0] = curPos[0] - grid;
            draw(curPos[0], curPos[1])
        }

        if (fruit = false) {
            randLoc();
        }
    }

}
setInterval(move, 1000/10); 
//automatically calls the 'move' function every time the specified timeframe passes.

//need a function to draw in fruit


//need function to generate random location within board(for the fruit)



//need to add the rest of the body/limit the body length



