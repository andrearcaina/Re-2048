function slideLeft() {
    for (let row = 0; row < ROWS; row++) {
        let full_row = board[row];
        
        full_row = slide(full_row);
        board[row] = full_row;
        
        for (let col = 0; col < COLS; col++){
            let gameTile = document.getElementById(row.toString() + "-" + col.toString());
            let number = board[row][col];
            
            updateTiles(gameTile, number);
        }
    }
}

function slideRight() {
    for (let row = 0; row < ROWS; row++) {
        let full_row = board[row];
        
        full_row.reverse();
        full_row = slide(full_row);
        board[row] = full_row.reverse();
        
        for (let col = 0; col < COLS; col++){
            let gameTile = document.getElementById(row.toString() + "-" + col.toString());
            let number = board[row][col];
            
            updateTiles(gameTile, number);
        }
    }
}

function slideUp() {
    for (let col = 0; col < COLS; col++) {
        let full_row = [board[0][col], board[1][col], board[2][col], board[3][col]];
        
        full_row = slide(full_row);
        
        for (let row = 0; row < ROWS; row++){
            board[row][col] = full_row[row];
            let gameTile = document.getElementById(row.toString() + "-" + col.toString());
            let number = board[row][col];
            
            updateTiles(gameTile, number);
        }
    }
}

function slideDown() {
    for (let col = 0; col < COLS; col++) {
        let full_row = [board[0][col], board[1][col], board[2][col], board[3][col]];
        
        full_row.reverse();
        full_row = slide(full_row);
        full_row.reverse();
        
        for (let row = 0; row < ROWS; row++){
            board[row][col] = full_row[row];
            let gameTile = document.getElementById(row.toString() + "-" + col.toString());
            let number = board[row][col];
            
            updateTiles(gameTile, number);
        }
    }
}