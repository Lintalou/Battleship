import { Ship } from "./ship.js";
import { Player } from "./player.js";

const players = [];

function generatePlayer(name) {
    players.push(new Player(name));
}

function generateShip(size) {
    return new Ship(size);
}

export { generatePlayer, generateShip, players }