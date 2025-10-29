import { Ship } from "./ship";

test("hit method", () => {
    const ship = new Ship(4);

    ship.hit();

    expect(ship.hasBeenHitCount).toBe(1);
})

test("isSunk method: ship hasn't sunk", () => {
    const ship = new Ship(2);

    ship.hit();
    ship.isSunk();

    expect(ship.hasSunk).toBe(false);
})

test("isSunk method: ship has sunk", () => {
    const ship = new Ship(2);

    ship.hit();
    ship.hit();
    ship.isSunk()

    expect(ship.hasSunk).toBe(true);
})