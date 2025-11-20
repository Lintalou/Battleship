import {
    generatePlayers, generateShip, getCurrentPlayer, getComputerPlayer,
    translateCoord, currentTurn, setCurrentTurn
} from "../game/main.js";

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

function displayShootingBoard() {
    for (let i = 0; i < 100; i++) {
        const squareDisplay = document.createElement("div");

        squareDisplay.dataset.index = i;

        shootingBoard.appendChild(squareDisplay);
    }
}

function start() {
    generatePlayers();

    const currentPlayer = getCurrentPlayer();

    setCurrentTurn(currentPlayer);

    const patrolBoat = generateShip(2);
    const carrier = generateShip(5);

    currentPlayer.gameBoard.place(patrolBoat, [6, "F"], "vertical");
    currentPlayer.gameBoard.place(carrier, [10, "A"], "horizontal");

    displayPrimaryBoard();
    displayShootingBoard();
}

startButton.addEventListener("click", start);

function playerShoot(event) {
    const target = event.target;

    if (!target.hasChildNodes() && target.className !== "hit") {
        const currentPlayer = getCurrentPlayer();

        if (currentTurn === currentPlayer.name) {
            const computer = getComputerPlayer();
            const targetCoord = translateCoord(Number(target.dataset.index));

            computer.gameBoard.receiveAttack(targetCoord);

            target.classList.add("hit");
        }
    }
}

shootingBoard.addEventListener("click", playerShoot);
