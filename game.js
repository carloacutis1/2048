function render() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';                    // clear old tiles
    board.forEach(value => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = value !== 0 ? value : '';
        grid.appendChild(cell);
    });
    document.getElementById('score').textContent = score;
}

function spawnTile() {

    // pick a random empty cell, place a 2 or 4

    // create an array with only the indices of the empty tiles 
    let emptySpaces = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {   
            // if a board space is empty, append its ind
            emptySpaces.push(i);
        }
    }
    // now we can randomly select a spot from this array
    let cell = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    
    // set the board at the selected empty board index to a 2 or 4
    // get a random choice of 2 or 4
    let num = ((Math.floor(Math.random() * 1000) % 2) + 1) * 2;
    // update board
    board[cell] = num;
    
}

function rotate(b) {
    // create a blank board
    let result = Array(16).fill(0);
    // loop through rows
    for (let row = 0; row < 4; row++) {
        // loop through columns
        for (let col = 0; col < 4; col++) {
            // set new board 
            result[col * 4 + (3 - row)] = b[row * 4 + col];
        }
    }
    // return the result
    return result;
}

function swipe(dir) {
    // user swipes in a direction

    // number of times the table needs to rotate to compress to the left
    let rot = { left: 0, down: 1, right: 2, up: 3 }[dir];

    if (rot < 0 || rot > 3) return;

    let b = [...board];

    // rotate the number of times it needs to
    for (let i = 0; i < rot; i++) b = rotate(b);

    // compress to the left!
    b = compress(b);

    // rotate back to how it was;
    for (let i = 0; i < (4 - rot) % 4; i++) b = rotate(b);

    board = b;
}

function compress(b) {
    // compress rows to the left

    let compBoard = [];
    let row = [];
    let compRow = [];

    // go by row
    for (let i = 0; i < 4; i++) {
        row = b.slice(i * 4, 4 * (i + 1));
        compRow = compressRow(row);
        compBoard = [...compBoard, ...compRow];
    }
    return compBoard;
}

function compressRow(row) {

    // filter zeros to the right ============================

    let compressedRow = [0, 0, 0, 0];   // array of zeros for later
    let tempRow = []
    let tempRow2 = [];
   
    // get non zero elements into proper places of array
    for (let i = 0; i < row.length; i++) {
        if (row[i] > 0) {
            tempRow.push(row[i]);
        }
    }

    // tempRow contains all non-zero elements

    // if adjacent nums, merge

    // loop through tempRow
    // if i == i+1 then write their sum to tempRow2

    for (let i = 0; i < tempRow.length; i++) {
        if (!(i + 1 === tempRow.length)) {
            if (tempRow[i] === tempRow[i + 1]) {
                tempRow2.push(tempRow[i] * 2);
                tempRow[i] = tempRow[i + 1] = 0;
                i++;
                continue;
            } 
        }
        tempRow2.push(tempRow[i]);
    }

    // write the non-zero values to their correct places in the array of zeros 
    for (let i = 0; i < compressedRow.length; i++) {
        if (i < tempRow2.length) compressedRow[i] = tempRow2[i];
    }

    return compressedRow;
}

function checkWin() {
    // checks if the tile 2048 exists

    if (board.includes(2048)) return true;
    return false;
}

// will be more complex of a check: "if there are no valid moves" 
function gameOver() {
    // checks if there are no open tiles left, returns t/f

    if (board.includes(0)) return false;
    return true;
}


// create board, length 16

let validResponses = ['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let prevBoard = [];
let score = 0;

// x_pos is horizontal
// y_pos is vertical

// (4, 3) is 0 0 0 0
//           0 0 0 0
//           0 0 0 #
//           0 0 0 0

// arr_ind = x * y - 1

// initialize the board with two tiles
spawnTile();
spawnTile();

render();

// on a key press, run the game loop passing the keypress to the func
document.addEventListener('keydown', function(event) {
    // player swipes

    if (validResponses.includes(event.key)) {

        prevBoard = board;

        if      (event.key === 'ArrowUp'    || event.key === 'w') swipe('up');
        else if (event.key === 'ArrowDown'  || event.key === 's') swipe('down');
        else if (event.key === 'ArrowLeft'  || event.key === 'a') swipe('left');
        else if (event.key === 'ArrowRight' || event.key === 'd') swipe('right');

        // update the score with the sum of all tiles.
        // still haev to do this

        if (!prevBoard.every((v, i) => v === board[i])) {
            // spawn in a new tile after a valid swipe
            spawnTile();
        }

        // push changes to the web page
        render();

        // check if the player wins or if the game is over
        if (checkWin()) alert('You Win!');
    }
});
