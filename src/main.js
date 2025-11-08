import { Ship } from "./ship.js";
import { Player } from "./player.js";

function generatePlayer(name) {
    return new Player(name);
}

function generateShip(size) {
    return new Ship(size);
}

export { generatePlayer, generateShip }