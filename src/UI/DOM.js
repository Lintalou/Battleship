import {
    generatePlayers, generateShip, getCurrentPlayer, getComputerPlayer,
    translateCoord, currentTurn, setCurrentTurn, changeLetterToNum
} from "../game/main.js";

const startButton = document.getElementById("start");
const primaryBoard = document.getElementById("primaryBoard");
const shootingBoard = document.getElementById("shootingBoard");
const shipCountSelect = document.getElementById("ship-count");
const selectContainer = document.getElementById("selectContainer");
const boardContainer = document.getElementById("boardContainer");

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

    const shipCount = shipCountSelect.value;

    if (shipCount === "random") {
        const randomNumber1 = Math.floor(Math.random() * 7) + 4;
        const randomNumber2 = Math.floor(Math.random() * 7) + 4;

        currentPlayer.gameBoard.populate(randomNumber1);
        computer.gameBoard.populate(randomNumber2);
    } else {
        currentPlayer.gameBoard.populate(Number(shipCount));
        computer.gameBoard.populate(Number(shipCount));
    }

    selectContainer.remove();

    displayPrimaryBoard();
    displayShootingBoard();
}

startButton.addEventListener("click", start);

function displayResult(playerName) {
    const resultText = document.createElement("div");

    resultText.id = "result-text";

    if (playerName === "player") {
        resultText.textContent = "Congrats, You Win.";
    } else {
        resultText.textContent = "You lost...";
    }

    boardContainer.appendChild(resultText);
}

function endTurn() {
    const currentPlayer = getCurrentPlayer();
    const computer = getComputerPlayer();

    if (currentPlayer.gameBoard.allSunk() === true) {
        shootingBoard.removeEventListener("click", playerShoot);
        primaryBoard.removeEventListener("click", computerShoot);

        displayResult(computer.name);
    } else if (computer.gameBoard.allSunk() === true) {
        shootingBoard.removeEventListener("click", playerShoot);
        primaryBoard.removeEventListener("click", computerShoot);

        displayResult(currentPlayer.name);
    }
}

function playerShoot(event) {
    const target = event.target;

    if (!target.hasChildNodes() && !target.dataset.state) {
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

const coordsToHit = [];
const coordWithShip = [];
let currentOrientation;

function generateIndex() {
    if (coordsToHit.length !== 0) {
        const coord = coordsToHit.shift();
        const index = Number(coord.join(""));

        return index;
    } else {
        const index = Math.floor(Math.random() * 100);

        return index;
    }
}

function addVerticalCoords(coordNum) {
    if (coordNum[0] - 1 >= 0) {
        const topCoord = [coordNum[0] - 1, coordNum[1]];
        coordsToHit.push(topCoord);
    }

    if (coordNum[0] + 1 < 10) {
        const bottomCoord = [coordNum[0] + 1, coordNum[1]];
        coordsToHit.push(bottomCoord);
    }
}

function addHorizontalCoords(coordNum) {
    if (coordNum[1] - 1 >= 0) {
        const leftCoord = [coordNum[0], coordNum[1] - 1];
        coordsToHit.push(leftCoord);
    }

    if (coordNum[1] + 1 < 10) {
        const rightCoord = [coordNum[0], coordNum[1] + 1];
        coordsToHit.push(rightCoord);
    }
}

function computerShoot() {
    const computer = getComputerPlayer();

    if (currentTurn === computer.name) {
        const currentPlayer = getCurrentPlayer();
        const index = generateIndex();
        const targetCoord = translateCoord(index);
        const coordNum = [targetCoord[0] - 1, changeLetterToNum(targetCoord[1])];
        const primaryBoardSquares = document.querySelectorAll("#primaryBoard div");

        if (coordsToHit.length === 0) {
            currentOrientation = "";
        }

        if (primaryBoardSquares[index].dataset.state) {
            computerShoot();
            return;
        }

        currentPlayer.gameBoard.receiveAttack(targetCoord);

        if (currentPlayer.gameBoard.board[coordNum[0]][coordNum[1]]) {
            primaryBoardSquares[index].dataset.state = "hitShip";

            const previousHitCoord = coordWithShip.pop();

            if (previousHitCoord) {
                if (previousHitCoord[0] === coordNum[0]) {
                    if (Math.abs(previousHitCoord[1] - coordNum[1]) === 1) {
                        currentOrientation = "horizontal";
                    }
                }

                if (previousHitCoord[1] === coordNum[1]) {
                    if (Math.abs(previousHitCoord[0] - coordNum[0]) === 1) {
                        currentOrientation = "vertical";
                    }
                }
            }

            if (currentOrientation === "vertical") {
                addVerticalCoords(coordNum);
            } else if (currentOrientation === "horizontal") {
                addHorizontalCoords(coordNum);
            } else {
                const randomNumber = Math.floor(Math.random() * 2);

                if (randomNumber === 0) {
                    addVerticalCoords(coordNum);
                    addHorizontalCoords(coordNum);
                }

                if (randomNumber === 1) {
                    addHorizontalCoords(coordNum);
                    addVerticalCoords(coordNum);
                }
            }

            coordWithShip.push(coordNum);
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