import { GameBoard } from "./gameboard.js"

class Player {
    constructor(name) {
        this.name = name;
        this.gameBoard = new GameBoard();
    }
}

export { Player }