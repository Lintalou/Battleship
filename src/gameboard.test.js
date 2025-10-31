import { GameBoard } from "./gameboard";
import { Ship } from "./ship";

test("place ships at coordinates, GameBoard", () => {
    const gameBoard = new GameBoard();
    const patrolBoat = new Ship(2);
    const submarine = new Ship(3);

    gameBoard.place(patrolBoat, [1, "A"], "horizontal");
    gameBoard.place(submarine, [1, "D"], "vertical");

    expect(gameBoard.board[0][0]).toBe(patrolBoat);
    expect(gameBoard.board[0][1]).toBe(patrolBoat);

    expect(gameBoard.board[0][3]).toBe(submarine);
    expect(gameBoard.board[1][3]).toBe(submarine);
    expect(gameBoard.board[2][3]).toBe(submarine);
})