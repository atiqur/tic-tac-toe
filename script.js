const GameCtrl = (function () {
  const data = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    currentPlayer: "X",
    gameOver: false,
  }

  return {
    isBoardFull: function () {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (data.board[row][col] === "") {
            return false
          }
        }
      }
      return true
    },
    getCurrentPlayer: function () {
      return data.currentPlayer
    },
    setCurrentPlayer: function (player) {
      data.currentPlayer = player
    },
    changePlayer: function () {
      data.currentPlayer = data.currentPlayer === "X" ? "O" : "X"
    },
    getGameOver: function () {
      return data.gameOver
    },
    setGameOver: function (val) {
      data.gameOver = val
    },
    markBoard: function (row, col) {
      data.board[row][col] = data.currentPlayer
    },
    getCellData: function (row, col) {
      return data.board[row][col]
    },
    getDataLog: function () {
      return data
    },
    checkWinner: function (player) {
      for (let i = 0; i < 3; i++) {
        if (data.board[i][0] === player && data.board[i][1] === player && data.board[i][2] === player) {
          return true
        }
        if (data.board[0][i] === player && data.board[1][i] === player && data.board[2][i] === player) {
          return true
        }
      }
      if (data.board[0][0] === player && data.board[1][1] === player && data.board[2][2] === player) {
        return true
      }
      if (data.board[0][2] === player && data.board[1][1] === player && data.board[2][0] === player) {
        return true
      }
      return false
    },
    resetBoard: function () {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          data.board[row][col] = ""
        }
      }
    }
  }
}
)()

const UICtrl = (function () {
  const UISelector = {
    cell00: "#cell-0-0",
    cell01: "#cell-0-1",
    cell02: "#cell-0-2",
    cell10: "#cell-1-0",
    cell11: "#cell-1-1",
    cell12: "#cell-1-2",
    cell20: "#cell-2-0",
    cell21: "#cell-2-1",
    cell22: "#cell-2-2",
    message: "#message",
    restartBtn: "#restart-btn",
  }
  return {
    UISelector,
    placeMark: function (row, col) {
      const player = GameCtrl.getCurrentPlayer()
      document.querySelector(`#cell-${row}-${col}`).textContent = player
      if (player === 'X') {
        document.querySelector(`#cell-${row}-${col}`).classList.add('red')
      } else {
        document.querySelector(`#cell-${row}-${col}`).classList.add('green')
      }
    },
    setMessage: function (msg) {
      document.querySelector(UISelector.message).textContent = msg
    },
    resetUI: function () {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          document.querySelector(`#cell-${row}-${col}`).textContent = ""
          document.querySelector(`#cell-${row}-${col}`).classList.remove('red')
          document.querySelector(`#cell-${row}-${col}`).classList.remove('green')
        }
      }
      this.setMessage("")
    }
  }
})()

const App = (function (GameCtrl, UICtrl) {
  UISelector = UICtrl.UISelector
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      document
        .querySelector(`#cell-${row}-${col}`)
        .addEventListener("click", () => makeMove(row, col))
    }
  }

  document.querySelector(UISelector.restartBtn).addEventListener('click', resetGame)

  function makeMove(row, col) {
    if (!GameCtrl.getGameOver() && GameCtrl.getCellData(row, col) === "") {
      GameCtrl.markBoard(row, col)
      UICtrl.placeMark(row, col)
      if (GameCtrl.checkWinner(GameCtrl.getCurrentPlayer())) {
        UICtrl.setMessage(`Player ${GameCtrl.getCurrentPlayer()} wins!!`)
        GameCtrl.setGameOver(true)
      } else if (GameCtrl.isBoardFull()) {
        UICtrl.setMessage(`It's a tie!!`)
        GameCtrl.setGameOver(true)
      }
      GameCtrl.changePlayer()
    }
  }

  function resetGame() {
    GameCtrl.resetBoard()
    GameCtrl.setCurrentPlayer('X')
    GameCtrl.setGameOver(false)
    UICtrl.resetUI()
  }

  return {
    init: function () {
      resetGame()
    }
  }

})(GameCtrl, UICtrl)

App.init()