/*
    include key inputs and sliding functionality
    on the grid (2048)
*/

// listens for key presses for arrow keys
document.addEventListener('keyup', (evt) => {
    if(evt.key == "ArrowUp") { 
        slideUp();
        blockTwo();
        gameOver();
    }
    else if (evt.key == "ArrowDown") {
        slideDown();
        blockTwo();
        gameOver();
    }
    else if (evt.key == "ArrowLeft") {
        slideLeft();
        blockTwo();
        gameOver();
    }
    else if (evt.key == "ArrowRight") {
        slideRight();
        blockTwo();
        gameOver();
    }
    document.getElementById("intScore").innerHTML = gameScore;
});

function slide(row) {
    //this creates a new array of all nums where the value is non-zero
    row = row.filter(num => num != 0);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            gameScore += row[i];
        }
    }
    row = row.filter(num => num != 0);
    while (row.length < COLS) {
        row.push(0);
    }
    return row;
}
