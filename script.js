const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");

const gameDiv = document.getElementById("game");
const formDiv = document.getElementById("player-form");
const message = document.querySelector(".message");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameOver = false;

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) return;

  formDiv.style.display = "none";
  gameDiv.style.display = "block";

  message.textContent = `${player1}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || gameOver) return;

    cell.textContent = currentPlayer;

    if (checkWinner()) {
      const winner = currentPlayer === "X" ? player1 : player2;
      message.textContent = `${winner} congratulations you won!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    const nextPlayer = currentPlayer === "X" ? player1 : player2;
    message.textContent = `${nextPlayer}, you're up`;
  });
});

function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;

    return (
      document.getElementById(String(a)).textContent !== "" &&
      document.getElementById(String(a)).textContent ===
        document.getElementById(String(b)).textContent &&
      document.getElementById(String(b)).textContent ===
        document.getElementById(String(c)).textContent
    );
  });
}