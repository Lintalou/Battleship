import { Ship } from "./ship";

test("hit method", () => {
    const ship = new Ship(4);

    ship.hit();

    expect(ship.hasBeenHitCount).toBe(1);
}) 