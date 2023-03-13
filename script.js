var Gameboard = {
  // create a board property
  board: [],
  // create a createBoard method
  createBoard: function () {
    // create a for loop that loops 10 times
    for (var i = 0; i < 10; i++) {
      // create a row array
      var row = [];
      // create a for loop that loops 10 times
      for (var j = 0; j < 10; j++) {
        // add a 0 to the row array
        row.push(0);
      }
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
};
