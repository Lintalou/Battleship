import { Ship } from "./ship.js";
import { Player } from "./player.js";

const players = [];

function generatePlayers() {
    players[0] = new Player("player");
    players[1] = new Player("computer");
}

function generateShip(size) {
    return new Ship(size);
}

function getCurrentPlayer() {
    if (players[0]) {
        return players[0];
    } else {
        console.log("players haven't been generated.");
    }
}

function getComputerPlayer() {
    if (players[1]) {
        return players[1];
    } else {
        console.log("players haven't been generated.");
    }
}

export { generatePlayers, generateShip, getCurrentPlayer, getComputerPlayer }