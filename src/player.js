import { GameBoard } from "./gameboard"

class Player {
    constructor(name) {
        this.name = name;
        this.gameBoard = new GameBoard();
    }
}

export { Player }