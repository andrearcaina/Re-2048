let board; let score = 0;           //these variables can be changed 
const ROWS = 4; const COLS = 4;     //these cannot be changed

// on load, call setUpGame()
window.onload = () => setupGame();

/*
    firstly, disables the new game button for 1 second
    reset the game by deleting all the divs present
    and then calling the setUpGame() function to start a new game
    then enables the new game button again
*/
function restartGame() {
    for(let row = 0; row < ROWS; row++) {
        for(let col = 0; col < COLS; col++) {
            let gameTile = document.getElementById(row.toString() + "-" + col.toString());
            gameTile.remove();
        }
    }
    
    document.querySelector("button").disabled = true;
    setTimeout(() => { document.querySelector("button").disabled = false; }, 1000);
    setupGame();
}

/* 
    set up the game board for 2048
    basically a matrix or a 4x4 array
*/
function setupGame() {
    board =    [[0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],             
                [0,0,0,0]
                ]
    for(let row = 0; row < ROWS; row++) {
        for(let col = 0; col < COLS; col++) {
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
        if (number <= 16384) {
            gameTile.classList.add("t"+number.toString());
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
            let percentage = Math.floor((Math.random() * 10)+1);
            let string = "";
            /*
                90% to get a 2
                10% to get a 4
            */
            if (percentage > 1) { string = "2"; }
            if (percentage == 1) { string = "4"; }
            
            gameTile_ID.innerText = string;
            gameTile_ID.classList.add("t"+string);
            tileFound = true;
        }
    }
}