import {
    generatePlayers, generateShip, getCurrentPlayer, getComputerPlayer,
    translateCoord, currentTurn, setCurrentTurn, changeLetterToNum
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
    const computer = getComputerPlayer();

    setCurrentTurn(currentPlayer);

    currentPlayer.gameBoard.populate();
    computer.gameBoard.populate();

    displayPrimaryBoard();
    displayShootingBoard();
}

startButton.addEventListener("click", start);

function endTurn() {
    const currentPlayer = getCurrentPlayer();
    const computer = getComputerPlayer();

    if (currentPlayer.gameBoard.allSunk() === true) {
        shootingBoard.removeEventListener("click", playerShoot);
        primaryBoard.removeEventListener("click", computerShoot);

        alert("Computer won");
    }

    if (computer.gameBoard.allSunk() === true) {
        shootingBoard.removeEventListener("click", playerShoot);
        primaryBoard.removeEventListener("click", computerShoot);

        alert("Player won");
    }
}

function playerShoot(event) {
    const target = event.target;

    if (!target.hasChildNodes() && target.dataset.state !== "hit") {
        const currentPlayer = getCurrentPlayer();

        if (currentTurn === currentPlayer.name) {
            const computer = getComputerPlayer();
            const targetCoord = translateCoord(Number(target.dataset.index));
            const coordNum = [targetCoord[0] - 1, changeLetterToNum(targetCoord[1])];

            if (computer.gameBoard.board[coordNum[0]][coordNum[1]]) {
                target.className = "ship";
            }

            computer.gameBoard.receiveAttack(targetCoord);

            if (target.className === "ship") {
                target.dataset.state = "hitShip";
            } else {
                target.dataset.state = "hit";
            }

            endTurn();

            setCurrentTurn(computer);

            computerAction();
        }
    }
}

shootingBoard.addEventListener("click", playerShoot);

function generateIndex() {
    const index = Math.floor(Math.random() * 100);

    return index;
}

function computerShoot() {
    const computer = getComputerPlayer();

    if (currentTurn === computer.name) {
        const currentPlayer = getCurrentPlayer();
        const index = generateIndex();
        const targetCoord = translateCoord(index);
        const primaryBoardSquares = document.querySelectorAll("#primaryBoard div");

        if (primaryBoardSquares[index].dataset.state) {
            computerShoot();
            return;
        }

        currentPlayer.gameBoard.receiveAttack(targetCoord);

        if (primaryBoardSquares[index].className === "ship") {
            primaryBoardSquares[index].dataset.state = "hitShip";
        } else {
            primaryBoardSquares[index].dataset.state = "hit";
        }

        endTurn();

        setCurrentTurn(currentPlayer);
    }
}

primaryBoard.addEventListener("click", computerShoot);

function computerAction() {
    const randomDelayInMilisec = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(() => {
        primaryBoard.click();
    }, randomDelayInMilisec)
}