let player1 = "";
let player2 = "";
let currentPlayer = "";
let symbol = "x";
let gameOver = false;
let moves = 0;

let board = ["","","","","","","","",""];

const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

document.getElementById("submit").onclick = function() {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  document.getElementById("form").style.display = "none";
  document.getElementById("game").style.display = "block";

  currentPlayer = player1;
  message.textContent = currentPlayer + ", you're up";
};

cells.forEach((cell) => {
  cell.onclick = function() {

    let index = parseInt(cell.id) - 1;

    if (board[index] !== "" || gameOver) return;

    board[index] = symbol;
    cell.textContent = symbol;
    moves++;

    if (checkWin()) {
      message.textContent = currentPlayer + " congratulations you won!";
      gameOver = true;
      return;
    }

    if (moves === 9) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    if (symbol === "x") {
      symbol = "o";
      currentPlayer = player2;
    } else {
      symbol = "x";
      currentPlayer = player1;
    }

    message.textContent = currentPlayer + ", you're up";
  };
});

function checkWin() {
  let win = [
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