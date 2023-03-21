let board; let score = 0;           //these variables can be changed 
const ROWS = 4; const COLS = 4;     //these cannot be changed

/* 
    set up the game board for 2048
    basically a matrix or a 4x4 array
*/
window.onload = function() {
    board =    [[0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],             
                [0,0,0,0]
                ]
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            let gameTile = document.createElement("div"); 
            let number = board[row][col];
            const BOARD = document.getElementById("gameBoard");

            gameTile.id = row.toString() + "-" + col.toString();
            updateTiles(gameTile, number); BOARD.append(gameTile);
        }
    }
    // setup two tiles at beginning after setup board
    // this can be implemented later on (once I figure out how to add tiles)
    blockTwo();
    blockTwo();
}

function updateTiles(gameTile, number) {
    gameTile.innerText = "";
    gameTile.classList.value = ""; 
    gameTile.classList.add("gameTile");
    if (number > 0) {
        gameTile.innerText = number;
        if (number <= 4096) {
            gameTile.classList.add("t"+number.toString());
        }
        else {
            gameTile.classList.add("t8192");
        }
    }
}

function blockTwo() {
    let emptyTile = false;
    let tileFound = false;

    //checks if there is an empty tile
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] == 0) { 
                emptyTile = true;
            }
        }
    }

    // if there is an empty tile, then return nothing
    if (!emptyTile) { return; }
    
    while (!tileFound) {
        /*
            reason to use Math.floor
            Math.random() returns a random number between (0 and 1)*4
            resulting in a decimal number between 0 and 4
            thus, Math.floor returns an integer value of the highest decimal number of that decimal
        */
        let row = Math.floor(Math.random() * ROWS);
        let col = Math.floor(Math.random() * COLS);
        if (board[row][col] == 0) {
            board[row][col] = 2;
            let gameTile_ID = document.getElementById(row.toString() + "-" + col.toString());
            gameTile_ID.innerText = "2";
            gameTile_ID.classList.add("t2");
            tileFound = true;
        }
    }
}