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

function translateCoord(coord) {
    if (typeof coord === number) {
        const arrOfLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        const newCoord = [];

        if (coord < 10) {
            newCoord[0] = 1;
            newCoord[1] = arrOfLetter[coord];

            return newCoord;
        } else {
            const numberSplit = coord.split("");

            newCoord[0] = numberSplit[0] + 1;
            newCoord[1] = arrOfLetter[numberSplit[1]];

            return newCoord;
        }
    }
}

export { generatePlayers, generateShip, getCurrentPlayer, getComputerPlayer, translateCoord }