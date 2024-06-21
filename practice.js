let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winner ('X' or 'O')
        }
    }
    if (!board.includes('')) {
        return 'tie';
    }
    return null;
}

function playerMove(index) {
    if (!gameOver && board[index] === '') {
        board[index] = currentPlayer;
        render();
        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            showResult(winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`);
        } else {
            currentPlayer = 'O';
            setTimeout(computerMove, 500); // Delay computer's move by 500ms
        }
    }
}

function computerMove() {
    if (gameOver) return;
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    setTimeout(() => { // Delay computer's move placement by 500ms
        board[move] = 'O';
        currentPlayer = 'X';
        render();
        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            showResult(winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`);
        }
    }, 500);
}

function minimax(board, depth, isMaximizing) {
    const result = checkWinner();
    if (result !== null) {
        if (result === 'O') {
            return 1;
        } else if (result === 'X') {
            return -1;
        } else {
            return 0;
        }
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function render() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((value, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = value;
        if (value === 'X') {
            cellElement.classList.add('x');
        } else if (value === 'O') {
            cellElement.classList.add('o');
        }
        cellElement.addEventListener('click', () => playerMove(index));
        boardElement.appendChild(cellElement);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    render();
    const resultPopup = document.querySelector('.result-popup');
    if (resultPopup) {
        resultPopup.remove();
    }
}

function showResult(message) {
    const resultPopup = document.createElement('div');
    resultPopup.classList.add('result-popup');
    resultPopup.innerHTML = `
        <div>${message}</div>
        <button onclick="resetGame()">Restart Game</button>
    `;
    document.body.appendChild(resultPopup);
}

render();
