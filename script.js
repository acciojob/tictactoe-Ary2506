let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameOver = false;
let moves = 0;

const board = ["","","","","","","","",""];

const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

document.getElementById("submit").onclick = function() {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  currentPlayer = player1;
  message.textContent = currentPlayer + ", you're up";
};

cells.forEach((cell) => {
  cell.addEventListener("click", function() {

    const id = parseInt(cell.id) - 1;

    if (board[id] !== "" || gameOver) return;

    board[id] = currentSymbol;
    cell.textContent = currentSymbol;
    moves++;

    if (checkWinner()) {
      message.textContent = currentPlayer + " congratulations you won!";
      gameOver = true;
      return;
    }

    if (moves === 9) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    if (currentSymbol === "x") {
      currentSymbol = "o";
      currentPlayer = player2;
    } else {
      currentSymbol = "x";
      currentPlayer = player1;
    }

    message.textContent = currentPlayer + ", you're up";
  });
});

function checkWinner() {
  const win = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return win.some(([a,b,c]) => {
    return board[a] &&
           board[a] === board[b] &&
           board[a] === board[c];
  });
}