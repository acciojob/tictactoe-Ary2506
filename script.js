const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");

const formContainer = document.getElementById("form-container");
const gameContainer = document.getElementById("game-container");
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

    if (player1 === "" || player2 === "") return;

    formContainer.style.display = "none";
    gameContainer.style.display = "block";

    message.textContent = `${player1}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (gameOver || cell.textContent !== "") return;

        cell.textContent = currentPlayer;

        if (checkWinner()) {
            const winner = currentPlayer === "X" ? player1 : player2;
            message.textContent = `${winner} congratulations you won!`;
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (currentPlayer === "X") {
            message.textContent = `${player1}, you're up`;
        } else {
            message.textContent = `${player2}, you're up`;
        }
    });
});

function checkWinner() {
    return winningCombinations.some((combo) => {
        const a = document.getElementById(String(combo[0])).textContent;
        const b = document.getElementById(String(combo[1])).textContent;
        const c = document.getElementById(String(combo[2])).textContent;

        return a !== "" && a === b && b === c;
    });
}