class Ship {
    constructor(length) {
        this.length = length;
        this.hasBeenHitCount = 0;
        this.hasSunk = false;
    }

    hit() {
        this.hasBeenHitCount += 1;
    }

    isSunk() {
        if (this.hasBeenHitCount >= this.length) {
            this.hasSunk = true;
        } else {
            this.hasSunk = false;
        }
    }
}

export { Ship }