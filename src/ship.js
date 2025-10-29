class Ship {
    constructor(length) {
        this.length = length;
        this.hasBeenHitCount = 0;
        this.hasSunk = false;
    }

    hit() {
        this.hasBeenHitCount += 1;
    }
}

export { Ship }