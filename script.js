// Initialize the board
let board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';
let gameOver = false;

// Function to update the UI
function updateUI() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let cell = document.getElementById(`cell-${row}-${col}`);
      cell.textContent = board[row][col];
    }
  }
}

// Function to check if the board is full
function isBoardFull() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === '') {
        return false;
      }
    }
  }
  return true;
}

// Function to check if a player has won
function checkWinner(player) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
  }

  return false;
}

// Function to handle a move
function makeMove(row, col) {
  if (board[row][col] === '' && !gameOver) {
    board[row][col] = currentPlayer;
    updateUI();

    if (checkWinner(currentPlayer)) {
      document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
    } else if (isBoardFull()) {
      document.getElementById('message').textContent = "It's a tie!";
      gameOver = true;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to restart the game
function restartGame() {
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById('message').textContent = '';
  updateUI();
}

// Initialize the UI
updateUI();
