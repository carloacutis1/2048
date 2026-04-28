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

    // create a duplicate board with only empty tiles 
    // array of the indices of the empty spaces (0s) in board
    let emptySpaces = [];
    for (let i = 0; i < board.length(); i++) {
        if (board[i] === 0) {   
            // if a board space is empty, append its ind
            emptySpaces.push(i);
        }
    }
    // now we can randomly select a spot from this array
    // random between 0 and length of emptySpaces inc.
    let cell = Math.floor(Math.random() * emptySpaces.length());
    
    // set the board at the empty index to a 2 or 4
    


    // this will be VERY SLOW when the board gets full. Will need to wait until
    // one of the few empty cells are chosen

    // pick a random empty cell
    // let cell = -1;
    // while (board[cell] === 0 || cell === -1) {
    //     cell = Math.floor(Math.random() * 16); // random between 0 and 15 inc.
    // }
    
    return;
}

function swipe(dir) {
    // user swipes in a direction
    // rotate the board to call compressRow
    return;
}

function compressRow() {
    // compress one row to the left
    return;
}

function checkWin() {
    // checks if the tile 2048 exists
    return;
}

function gameOver() {
    // checks if there are no open tiles left, returns t/f
}

function event() {

}


// create board, length 16

let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// x_pos is horizontal
// y_pos is vertical

// (4, 3) is 0 0 0 0
//           0 0 0 0
//           0 0 0 #
//           0 0 0 0

// arr_ind = x * y -1

// initialize the board with two tiles
spawnTile();
spawnTile();

// on a key press, run the game loop passing the keypress to the func
document.addEventListener('keydown', function(event) {
    // player swipes
    if (event.key === 'ArrowUp' || event.key === 'w') swipe('up');
    else if (event.key === 'ArrowDown' || event.key === 's') swipe('down');
    else if (event.key === 'ArrowLeft' || event.key === 'a') swipe('left');
    else if (event.key === 'ArrowRight' || event.key === 'd') swipe('right');

    // spawn in a new tile 
    spawnTile();
    // push changes to the web page
    render();

    // check if the player wins or if the game is over
    if (checkWin()) alert('You Win!');
    if (gameOver()) alert('Game Over!');

});
