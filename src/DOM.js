import { generatePlayer, generateShip, players } from "./main.js";

const startButton = document.getElementById("start");
const primaryBoard = document.getElementById("primaryBoard");
const shootingBoard = document.getElementById("shootingBoard");

function displayPrimaryBoard() {
    players[0].gameBoard.board.forEach((row) => {
        row.forEach((square) => {
            const squareDisplay = document.createElement("div");

            if (square) {
                squareDisplay.className = "ship";
            }

            primaryBoard.appendChild(squareDisplay);
        })
    })
}