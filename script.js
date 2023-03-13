var Gameboard = {
  // create a board property
  board: [],
  // create a createBoard method
  createBoard: function () {
    // create a for loop that loops 10 times
    for (var i = 0; i < 10; i++) {
      console.log("i: " + i);
      // weird, the loop works but it displays 1 square
      // create a row array
      var row = [];
      // create a for loop that loops 10 times
      for (var j = 0; j < 10; j++) {
        console.log("j: " + j);
        // add a 0 to the row array
        row.push(0);
      }
      // i think i found where the problem is
      // the row array is in the for loop
      // add the row array to the board array
      this.board.push(row);
    }
  },
};

var Player = {
  // create a symbol property
  symbol: "",
  // create a selectSymbol method
  selectSymbol: function () {
    // create a variable that stores the user's input
    var symbol = prompt("Please select X or O");
    // make the symbol property equal to the user's input
    this.symbol = symbol;
    // check if the user's input is not X or O
    if (symbol !== "X" && symbol !== "O") {
      // call the selectSymbol method
      alert("Please select X or O");
      this.selectSymbol();
    }
    console.log(this.symbol);
    // works as expected
  },
};

var Game = {
  // turn property
  turn: 0,
  // create a start method
  start: function () {
    // create the board
    Gameboard.createBoard();
    // let player 1 select a symbol
    Player.selectSymbol();
    // add event listeners to each cell
    var cells = document.querySelectorAll(".cell");
    cells.forEach(function (cell) {
      cell.addEventListener("click", Game.handleMove);
    });
    // add event listener to the reset button
    var resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", Game.reset);
  },

  // create a handleMove method
  handleMove: function (event) {
    // check if the cell is empty
    if (!event.target.textContent) {
      // get the index of the cell
      var index = event.target.id.slice(-1);
      // add the player's symbol to the cell
      event.target.textContent = Player.symbol;
      // check if the player won
      if (Game.checkWin(Player.symbol)) {
        // alert the player that they won
        Game.showResult(Player.symbol + " won!");
        // reset the game
        Game.reset();
      } else if (Game.checkTie()) {
        // alert the player that they tied
        Game.showResult("Tie!");
        // reset the game
        Game.reset();
      } else {
        // switch the player
        Game.switchPlayer();
      }
    }
  },

  // create a switchPlayer method
  switchPlayer: function () {
    Game.turn++;
    if (Player.symbol === "X") {
      Player.symbol = "O";
    } else {
      Player.symbol = "X";
    }
  },

  // create a checkWin method
  checkWin: function (symbol) {
    // lots of ways to do this
    // winning combinations in tic-tac-toe
    var winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // above are the rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // above are the columns
      [0, 4, 8],
      [2, 4, 6],
    ];
    // above are the diagonals
    // loop through the winning combinations
    for (var i = 0; i < winningCombinations.length; i++) {
      var combination = winningCombinations[i];
      // check if the board matches the current combination
      if (
        Gameboard.board[combination[0]] === symbol &&
        Gameboard.board[combination[1]] === symbol &&
        Gameboard.board[combination[2]] === symbol
      ) {
        return true;
      }
    }
    return false;
  },

  // create a checkTie method
  checkTie: function () {
    // check if the turn is 9
    // because there are 9 cells, if checkwin doesn't fire until then, it's a tie
    if (Game.turn === 9) {
      return true;
    }
    return false;
  },

  // create a showResult method
  showResult: function (message) {
    var result = document.querySelector(".result");
    result.textContent = message;
    // remove event listeners from the cells
    // so that the game can't be played anymore
    var cells = document.querySelectorAll(".cell");
    cells.forEach(function (cell) {
      cell.removeEventListener("click", Game.handleMove);
    });
  },

  // create a reset method
  reset: function () {
    // reset the board
    Gameboard.board = [];
    Gameboard.createBoard();
    // reset the turn
    Game.turn = 0;
    // reset the player's symbol
    Player.symbol = "";
    // reset the cells
    var cells = document.querySelectorAll(".cell");
    cells.forEach(function (cell) {
      cell.textContent = "";
    });
    // reset the result
    var result = document.querySelector(".result");
    result.textContent = "";
    // start the game again
    Game.start();
  },
};

Game.start();
