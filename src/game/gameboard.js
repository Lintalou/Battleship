import { generateShip, translateCoord, changeLetterToNum } from "./main.js";
import { checkHorizontal, checkVertical } from "./checkPlacement.js";

function createEmptyBoard() {
    const board = new Array(10);

    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(10);
    }

    return board;
}

class GameBoard {
    constructor() {
        this.board = createEmptyBoard();
        this.missedAttacks = [];
        this.ships = [];
    }

    place(ship, coord, orientation) {
        const coordNum = [coord[0] - 1, changeLetterToNum(coord[1])];

        this.ships.push(ship);

        if (orientation.toLowerCase() === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                this.board[coordNum[0]][coordNum[1] + i] = ship;
            }
        }

        if (orientation.toLowerCase() === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                this.board[coordNum[0] + i][coordNum[1]] = ship;
            }
        }
    }

    receiveAttack(coord) {
        const coordNum = [coord[0] - 1, changeLetterToNum(coord[1])];

        if (this.board[coordNum[0]][coordNum[1]]) {
            this.board[coordNum[0]][coordNum[1]].hit();
        } else {
            this.missedAttacks.push(coord);
        }
    }

    allSunk() {
        const booleanArr = [];

        this.ships.forEach((ship) => {
            ship.isSunk();

            booleanArr.push(ship.hasSunk);
        })

        if (booleanArr.includes(false)) {
            return false;
        } else {
            return true;
        }
    }

    populate(shipCount) {
        while (this.ships.length !== shipCount) {
            const randomIndex = Math.floor(Math.random() * 100);
            const coord = translateCoord(randomIndex);
            const coordNum = [coord[0] - 1, changeLetterToNum(coord[1])];

            const randomSize = Math.floor(Math.random() * 4) + 2;
            const ship = generateShip(randomSize);

            const horizontalCheck = checkHorizontal(this.board, ship, coordNum);
            const verticalCheck = checkVertical(this.board, ship, coordNum);

            if (horizontalCheck && verticalCheck) {
                const orientationNum = Math.floor(Math.random() * 2);

                if (orientationNum === 0) {
                    this.place(ship, coord, "horizontal");
                } else {
                    this.place(ship, coord, "vertical");
                }
            } else if (horizontalCheck) {
                this.place(ship, coord, "horizontal");
            } else if (verticalCheck) {
                this.place(ship, coord, "vertical");
            }
        }
    }
}

export { GameBoard }