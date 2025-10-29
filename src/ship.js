class Ship {
    constructor(length, hasBeenHitCount) {
        this.length = length;
        this.hasBeenHitCount = hasBeenHitCount;
        this.hasSunk = false;
    }
}

export { Ship }