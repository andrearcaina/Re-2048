import Grid from "./grid.js"
import Tile from "./tile.js"

const gameBoard = document.getElementById("game-board")
const player = document.querySelector('.player')
const score = document.getElementById('Score')
const high = document.getElementById('High')
let gameScore; let highScore;

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
}

async function handleInput(e) {
    switch (e.key) {
        case "ArrowUp" || 87:
            if (!canMoveUp()) {
                setupInput()
                return
            }
            await moveUp()
            break
        case "ArrowDown" || 83:
            if (!canMoveDown()) {
                setupInput()
                return
            }
            await moveDown()
            break
        case "ArrowLeft" || 65:
            if (!canMoveLeft()) {
                setupInput()
                return
            }
            await moveLeft()
            break
        case "ArrowRight" || 68:
            if (!canMoveRight()) {
                setupInput()
                return
            }
            await moveRight()
            break
        default:
            setupInput()
            return
    }

    grid.cells.forEach(cell => cell.mergeTiles())

    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        newTile.waitForTransition(true).then(() => {
            player.style.animation = 'fadeIn 2s';
            player.innerHTML = 'Better luck next time!';
            player.appendChild(resetButton);

            gameScore = score.innerHTML;
            highScore = high.innerHTML;
            console.log(gameScore);
            console.log(highScore);

            if (gameScore > highScore) {
                high.innerHTML = score.innerHTML;
                console.log(score.innerHTML);
                console.log(high.innerHTML);
            }
        })
        return
    }

    setupInput()
}

function moveUp() {
    return slideTiles(grid.cellsByColumn)
}

function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moveLeft() {
    return slideTiles(grid.cellsByRow)
}

function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
    return Promise.all(
        cells.flatMap(group => {
            const promises = []
            for (let i = 1; i < group.length; i++) {
                const cell = group[i]
                if (cell.tile == null) continue
                    let lastValidCell
                for (let j = i - 1; j >= 0; j--) {
                    const moveToCell = group[j]
                    if (!moveToCell.canAccept(cell.tile)) break
                    lastValidCell = moveToCell
                }

                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if (lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile
                    } else {
                        lastValidCell.tile = cell.tile
                    }
                    cell.tile = null
                }
            }
            return promises
        })
    )
}

function canMoveUp() {
    return canMove(grid.cellsByColumn)
}

function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}

function canMoveLeft() {
    return canMove(grid.cellsByRow)
}

function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
        if (index === 0) return false
        if (cell.tile == null) return false
        const moveToCell = group[index - 1]
        return moveToCell.canAccept(cell.tile)
        })
    })
}

function resetGame() { 
    player.removeChild(resetButton);
    player.innerHTML = '';
    grid.cells.forEach(cell => cell.tile = null);
    
    score.innerHTML = 0;
    gameScore = 0;
    highScore = high.innerHTML;

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.remove());

    grid.randomEmptyCell().tile = new Tile(gameBoard);
    grid.randomEmptyCell().tile = new Tile(gameBoard);
    setupInput();
}

const resetButton = document.createElement('button');
resetButton.innerHTML = 'Try again!';
resetButton.addEventListener('click', resetGame);

resetButton.style.backgroundColor = '#AAA';
resetButton.style.textAlign = 'center';
resetButton.style.display = 'inline-block';
resetButton.style.fontSize = '14px';
resetButton.style.borderRadius = '4px';
resetButton.style.margin = '4px 2px';
resetButton.style.cursor = 'pointer';
resetButton.style.fontWeight = 'bold';
resetButton.style.height = '30px';

resetButton.addEventListener('mouseover', function() {
    resetButton.style.backgroundColor = '#a9b7c1';
});

resetButton.addEventListener('mouseout', function() {
    resetButton.style.backgroundColor = '#AAA';
});