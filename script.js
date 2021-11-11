let canvas = document.getElementById('canvas'); //easy reference to canvas element
let ctx = canvas.getContext('2d'); // "brush"

//need a function which returns the highest multiple of twenty.
const lowestTwenty = (num) => {
    let answer = parseInt(num / 20);
    return answer;
}

//set width and height of canvas
canvas.width = lowestTwenty(window.innerWidth) * 20 - 20;
canvas.height = lowestTwenty(window.innerHeight) * 20 - 100;



let xCenter = lowestTwenty(canvas.width / 2) * 20; //horizontal point near center
let yCenter = lowestTwenty(canvas.height / 2) * 20; //veritical point near center

console.log(`${xCenter} ${yCenter}`);

dx = 0; //horizontal "velocity"
dy = 0; //veritocal "velocity"

let pause = true;
let frameRate = 15;

let fruit = false;
let score = 0;

let fruitPos = [];
let curPos = [xCenter, yCenter] //starts at the center(snake head)
let Length = 3; //total length of snake, starts at 3

let bodyPos = []; //position of body
let bodyX =[];
let bodyY = [];

let grid = 20; //grid size, also determines how far one step is

//moved to top
const drawFruit = (fruitX, fruitY) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(fruitX, fruitY, grid, grid)
}

console.log(canvas.height)

const randLoc = () => {
    fruitPos = [];
    fruit = true;
    fruitPos.push(lowestTwenty(Math.random() * canvas.width - 20)* 20); //random location on x plane
    fruitPos.push(lowestTwenty(Math.random() * canvas.height - 20)* 20);//random location on y plane
    console.log(fruitPos);
    drawFruit(fruitPos[0], fruitPos[1]);
} //working

//need 'Game Over' Screen
const over = () => {
    pause = true;
    fruit = false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    score = 0;
    document.getElementById('score').innerHTML = 'Score: 0'
    document.getElementById('gameState').innerHTML = `GAME OVER. HIGH SCORE: ${score}. PRESS SPACE TO RESTART.`
}
//need a way to extract x and y coordinates from bodyPos




//draw a rectangle, red and starts at the center. Function form will be useful
const draw = (x, y) => {
    ctx.fillStyle = 'red' //colors it red
    bodyPos.push(x, y); //adds two more data points, or xy coordinate pairs, to the position tracker, starting at three pairs max 
    ctx.fillRect(x, y, grid, grid);
    if (bodyPos.length > Length * 2) {
        //checks for current length, starting at 3 pairs(6 data points), starts to remove the oldest points after that cutoff
        let removedX = bodyPos.shift();
        //removes the FIRST element of the position tracker array, an X value
        let removedY = bodyPos.shift();
        //removes the SECOND element of the position tracker arary, a Y value
        ctx.clearRect(removedX, removedY, grid, grid);
        //clears the oldest rectangle
    }
    if (curPos[0] === fruitPos[0] && curPos[1] === fruitPos[1]) {
        ctx.fillRect(fruitPos[0], fruitPos[1], grid, grid);
        fruitPos = [];
        fruit = false;
        Length++;
        score++;
    }

    if (curPos[0] === bodyPos) {
        over();
    }
    
    
    if (curPos[0] >= canvas.width && dx === 1) {
        //check for wall, horizontally
        console.log('right');
        dx = 1;
        curPos[0] = -20;
    }

    if (curPos[0] <= 0 && dx === -1) {
        //check for wall, horizontally
        console.log('left');
        dx = -1;
        curPos[0] = canvas.width;
        
    }

    if (curPos[1] <= 0 && dy === -1) {
        //check for wall, vertically
        console.log('top');
        dy = -1;
        curPos[1] = canvas.height;
        
    }

    if (curPos[1] >= canvas.height && dy === 1) {
        //check for wall, vertically
        console.log('bottom')
        dy = 1;
        curPos[1] = -20;
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
            if (fruit === false) {
                randLoc();
            }
        } else {
            return;
        }
    } else {
        if (keyCode === ' ') {
            pause = true;
            document.getElementById('gameState').innerHTML = 'Paused. Press SPACE to start.';
        }

        if (keyCode === 'ArrowUp' && dy !== 1) {
            curPos[1] = curPos[1] - grid;
            dy = -1;
            dx = 0;
            draw(curPos[0], curPos[1])
        }

        if (keyCode === 'ArrowRight' && dx !== -1) {
            curPos[0] = curPos[0] + grid;
            dy = 0;
            dx = 1;
            draw(curPos[0], curPos[1])
        }

        if (keyCode === 'ArrowDown' && dy !== -1) {
            curPos[1] = curPos[1] + grid;
            dy = 1;
            dx = 0;
            draw(curPos[0], curPos[1])
        }

        if (keyCode === 'ArrowLeft' && dx !== 1) {
            curPos[0] = curPos[0] - grid;
            dy = 0;
            dx = -1;
            draw(curPos[0], curPos[1])
        }

        if (keyCode === 'r') {
            over();
        }
    // switch (keyCode) {
    //     case ' ':
    //         pause = true;
    //         document.getElementById('gameState').innerHTML = 'Paused. Press SPACE to start.'
    //         break;
    //     case 'ArrowUp':
    //         //takes y coordinate, moves one "grid" and draws it there
    //         curPos[1] = curPos[1] - grid;
    //         dy = -1;
    //         dx = 0;
    //         draw(curPos[0], curPos[1])
    //         break;
        
    //     case 'ArrowRight':
    //         curPos[0] = curPos[0] + grid;
    //         dx = 1;
    //         dy = 0;
    //         draw(curPos[0], curPos[1])
    //         break;

    //     case 'ArrowDown':
    //         curPos[1] = curPos[1] + grid;
    //         dy = 1;
    //         dx = 0;
    //         draw(curPos[0], curPos[1])
    //         break;

    //     case 'ArrowLeft':
    //         curPos[0] = curPos[0] - grid;
    //         dx = -1;
    //         dy = 0;
    //         draw(curPos[0], curPos[1])
    //         break;
    // }
}
})//working

//need to automatically move snake when unpaused
const moveUpdate = () => {
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

        if (fruit === false) {
            randLoc()
        }

        document.getElementById('score').innerHTML = `Score: ${score}`
    }

}
setInterval(moveUpdate, 1000/frameRate); 
//automatically calls the 'move' function every time the specified timeframe passes.

//need a function to draw in fruit


//need function to generate random location within board(for the fruit)



//need to add the rest of the body/limit the body length



