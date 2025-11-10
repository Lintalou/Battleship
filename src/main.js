import { Ship } from "./ship.js";
import { Player } from "./player.js";

const data = {
    player: []
}

function generatePlayer(name) {
    data.player.push(new Player(name));
}

function generateShip(size) {
    return new Ship(size);
}

export { generatePlayer, generateShip, data }