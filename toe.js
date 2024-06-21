let player1Name, player2Name, currentPlayer, currentPlayerMarker;
let gameActive = false;
const board = ['', '', '', '', '', '', '', '', ''];

function startGame() {
  player1Name = document.getElementById('player1').value.trim();
  player2Name = document.getElementById('player2').value.trim();
  
  if (!player1Name || !player2Name) {
    alert('Please enter both player names.');
    return;
  }

  if (player1Name.toLowerCase() === player2Name.toLowerCase()) {
    player2Name = prompt('Player 2 name cannot be the same as Player 1. Please enter a different name for Player 2:');
    if (!player2Name) {
      alert('Please enter a valid name for Player 2.');
      return;
    }
  }

  currentPlayer = player1Name;
  currentPlayerMarker = player1Name.charAt(0).toUpperCase();
  
  document.getElementById('name-input').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  document.getElementById('status').innerText = `Player ${currentPlayer}'s turn (${currentPlayerMarker})`;
  gameActive = true;
}

function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayerMarker;
  document.getElementById(`cell${index}`).innerText = currentPlayerMarker;

  if (checkWinner()) {
    showWinnerModal(currentPlayer);
    gameActive = false;
  } else if (!board.includes('')) {
    showWinnerModal('draw');
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
    currentPlayerMarker = currentPlayer.charAt(0).toUpperCase();
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn (${currentPlayerMarker})`;
  }
}

function reset() {
  board.fill('');
  document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
  currentPlayer = player1Name;
  currentPlayerMarker = player1Name.charAt(0).toUpperCase();
  document.getElementById('status').innerText = `Player ${currentPlayer}'s turn (${currentPlayerMarker})`;
  gameActive = true;
  closeModal();
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function showWinnerModal(winner) {
  let message;
  if (winner === 'draw') {
    message = 'It\'s a draw!';
  } else {
    message = `${winner} wins!`;
  }

  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  modalMessage.innerText = message;
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function changePlayers() {
  document.getElementById('name-input').style.display = 'block';
  document.getElementById('game-container').style.display = 'none';
  closeModal();
}






// Get references to the buttons
const friendButton = document.getElementById('friend-btn');
const computerButton = document.getElementById('computer-btn');

// Attach event listeners to the buttons
friendButton.addEventListener('click', startGameWithFriend);
computerButton.addEventListener('click', startGameWithComputer);

// Define the functions
function startGameWithFriend() {
  document.getElementById('contain').style.display = 'none';
  document.getElementById('name-input').style.display = 'block';
}

function startGameWithComputer() {
  player1Name = prompt('Enter your name:');
  if (!player1Name) {
    alert('Please enter a valid name.');
    return;
  }

  player2Name = 'Computer';
  currentPlayer = player1Name;
  currentPlayerMarker = 'X';
  
  document.getElementById('contain').style.display = 'none';
  document.getElementById('game-contain').style.display = 'block';
  document.getElementById('status').innerText = `Player ${currentPlayer}'s turn (${currentPlayerMarker})`;
  gameActive = true;

  if (currentPlayer === 'Computer') {
    const computerMove = makeComputerMove();
    setTimeout(() => {
      handleClick(computerMove);
    }, 500);
  }
}





// Get references to the links
const friendLink = document.getElementById('friend-link');
const computerLink = document.getElementById('computer-link');

// Attach event listeners to the links
friendLink.addEventListener('click', startGameWithFriend);
computerLink.addEventListener('click', startGameWithComputer);

// Define the functions
function startGameWithFriend(event) {
  event.preventDefault(); // Prevent default link behavior (page navigation)
  // Add your logic to start the game with a friend
}

function startGameWithComputer(event) {
  event.preventDefault(); // Prevent default link behavior (page navigation)
  // Add your logic to start the game against the computer
}


