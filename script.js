//remake of snake, first version didn't work. Trying new method, css grid rather than creating an animation through javascript
let gameBoard = document.getElementById("game"); //set container as a variable for easy reference



const drawGrid = (repeats) => {
    for (let i = 1; i <= repeats; i++) {
        //a loop that creates "div" elements for use in a grid, up to the number of repeats, passed as the argument of the function
        let newDiv = document.createElement("DIV"); //creates the element
        newDiv.className = `box ${i}` //gives the classes of "box" and "i(square number)"
        newDiv.innerHTML = `${i}` //puts number equivalent to its position for easy reference
        gameBoard.appendChild(newDiv); //puts the created element under the container
    }; //working
};

//drawGrid(225); //draws squares when site loads

/*need to create a "scale" system. Firstly, check for site width and height, divide them by a certain scale, say 50px,
using "Math.floor" to get an integer value of grid rows and columns. Secondly, use the product of the width and height to 
pass as an argument for drawGrid function. Thirdly, set rows and columns accordingly in css file, dynamically for all browser sizes.
End result must be a grid perfectly filled with squares of the same dimensions*/

// const calculateGrid = () => {
//     let boardStyle = gameBoard.style;
//     let numRow = Math.floor(window.innerHeight/30);
//     let numCol = Math.floor(window.innerWidth/30);
//     console.log(`${numRow} ${numCol}`)
//     //boardStyle.setProperty("--numColFin", numCol);
//     //boardStyle.setProperty("--numRowFin", numRow);
//     //boardStyle.setProperty("--innerWidth", Math.floor(window.innerWidth));
//     //boardStyle.setProperty("--innerHeight", Math.floor(window.innerHeight));
//     //drawGrid(numRow * numCol);
// };
drawGrid(900);

//calculateGrid(); //half working grid 

//need to render snake and fruits. start by setting snake position as array, mapped to numbered tiles within grid


