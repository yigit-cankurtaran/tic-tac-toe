const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset");
let currentPlayer;
let gameover = false;

function getPlayerCharacter() {
  let character = prompt("Please enter your character (X or O)");
  while (character !== "X" && character !== "O") {
    character = prompt("Invalid character. Pick X or O");
  }
  return character;
}

currentPlayer = getPlayerCharacter();

class handleCellClick {
  constructor() {
    if (gameover) return;
    if (this.textContent !== "") return;
    this.textContent = currentPlayer;
    checkForWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkForWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let combo of winningCombos) {
    if (
      cells[combo[0]].textContent === currentPlayer &&
      cells[combo[1]].textContent === currentPlayer &&
      cells[combo[2]].textContent === currentPlayer
    ) {
      alert(`Player ${currentPlayer} has won!`);
      gameover = true;
      return;
    }
  }

  if (Array.from(cells).every((cell) => cell.textContent !== "")) {
    alert("Game over. It was a tie!");
    gameover = true;
  }
}

function handleReset() {
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  gameover = false;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", handleReset);
