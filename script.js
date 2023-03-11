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
  },
};
