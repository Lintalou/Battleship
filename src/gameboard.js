function createEmptyBoard() {
    const board = new Array(10);

    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(10);
    }

    return board;
}

function changeLetterToNum(letter) {
    const arrOfLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    return arrOfLetter.indexOf(letter.toUpperCase());
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

        if (this.board[coordNum[0]][coordNum[1]] !== undefined) {
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
}

export { GameBoard }