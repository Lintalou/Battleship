import { generatePlayer, generateShip, players } from "./main.js";

const startButton = document.getElementById("start");
const primaryBoard = document.getElementById("primaryBoard");
const shootingBoard = document.getElementById("shootingBoard");

function displayPrimaryBoard() {
    players[0].gameBoard.board.forEach((row) => {
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
    generatePlayer("player");
    generatePlayer("computer");

    const patrolBoat = generateShip(2);
    const carrier = generateShip(5);

    players[0].gameBoard.place(patrolBoat, [6, "F"], "vertical");
    players[0].gameBoard.place(carrier, [10, "A"], "horizontal");

    displayPrimaryBoard();
}

startButton.addEventListener("click", start);
