let board; let score = 0;      //these variables can be changed
const rows = 4; const cols = 4; //these cannot be changed

// onload, call setupBoard()
windows.onload = function() {
    setupBoard();
}

/* 
    set up the game board for 2048
    basically a matrix or a 4x4 array
*/
function setupBoard() { 
    board =    [[0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],             
                [0,0,0,0]
                ]
    for(let row = 0; row < rows; i++){
        for(let col = 0; col < cols; j++){
            let gameTile = document.createElement("div"); 
            let number = board[row][col];
            const BOARD = document.getElementById("gameBoard");

            gameTile.id = row.toString() + "-" + col.toString();
            updateTiles(gameTile, number); BOARD.append(gameTile);
        }
    }
    // setup two tiles at beginning after setup board
    // this can be implemented later on (once I figure out how to add tiles)
}

/* 
    this function can be changed later on
    when the user presses input keys
*/
function updateTiles(gameTile, number) {
    gameTile.innerText = "";
    gameTile.classList.value = ""; 
    gameTile.classList.add("gameTile");
    if (number > 0) {
        gameTile.innerText = number;
    }
    else if (number <= 4096) {
        gameTile.classList.add("t"+number.toString());
    }
    else {
        gameTile.classList.add("t8192");
    }
}
