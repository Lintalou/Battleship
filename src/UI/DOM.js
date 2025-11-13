import { generatePlayers, generateShip, getCurrentPlayer, getComputerPlayer } from "../game/main.js";

const startButton = document.getElementById("start");
const primaryBoard = document.getElementById("primaryBoard");
const shootingBoard = document.getElementById("shootingBoard");

function displayPrimaryBoard() {
    const currentPlayer = getCurrentPlayer();

    currentPlayer.gameBoard.board.forEach((row) => {
        for (let i = 0; i < row.length; i++) {
            const squareDisplay = document.createElement("div");

            const square = row[i];
            if (square) {
                squareDisplay.className = "ship";
            }

            primaryBoard.appendChild(squareDisplay);
        }
    })
}

function start() {
    generatePlayers();

    const currentPlayer = getCurrentPlayer();

    const patrolBoat = generateShip(2);
    const carrier = generateShip(5);

    currentPlayer.gameBoard.place(patrolBoat, [6, "F"], "vertical");
    currentPlayer.gameBoard.place(carrier, [10, "A"], "horizontal");

    displayPrimaryBoard();
}

startButton.addEventListener("click", start);
