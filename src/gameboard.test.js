import { GameBoard } from "./gameboard";
import { Ship } from "./ship";

test("making the game's board", () => {
    const gameBoard = new GameBoard();

    let squareCount = 0;

    for (let i = 0; i < gameBoard.board.length; i++) {
        squareCount += gameBoard.board[i].length;
    }

    expect(squareCount).toBe(100);
})

test("place ships at coordinates", () => {
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

test("ship received attack", () => {
    const gameBoard = new GameBoard();
    const patrolBoat = new Ship(2);

    gameBoard.place(patrolBoat, [3, "J"], "vertical");

    gameBoard.receiveAttack([3, "J"]);

    expect(patrolBoat.hasBeenHitCount).toBe(1);
})

test("ship hasn't received attack", () => {
    const gameBoard = new GameBoard();
    const patrolBoat = new Ship(2);

    gameBoard.place(patrolBoat, [3, "J"], "vertical");

    gameBoard.receiveAttack([6, "A"]);

    expect(gameBoard.missedAttacks[0]).toEqual([6, "A"]);
})