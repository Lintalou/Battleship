function checkHorizontal(board, ship, coord) {
    const x = coord[1];
    const y = coord[0];

    for (let i = 0; i < ship.length; i++) {
        if (x + i > 9) {
            return false;
        }

        if (board[y][x + i]) {
            return false;
        }

        if (i === 0) {
            if (board[y][x - 1]) {
                return false;
            }

            if (y - 1 >= 0) {
                if (board[y - 1][x]) {
                    return false;
                }
            }

            if (y + 1 < 10) {
                if (board[y + 1][x]) {
                    return false;
                }
            }
        } else if (i === ship.length - 1) {
            if (board[y][(x + i) + 1]) {
                return false;
            }

            if (y - 1 >= 0) {
                if (board[y - 1][x + i]) {
                    return false;
                }
            }

            if (y + 1 < 10) {
                if (board[y + 1][x + i]) {
                    return false;
                }
            }
        } else {
            if (y - 1 >= 0) {
                if (board[y - 1][x + i]) {
                    return false;
                }
            }

            if (y + 1 < 10) {
                if (board[y + 1][x + i]) {
                    return false;
                }
            }
        }
    }

    return true;
}

function checkVertical(board, ship, coord) {
    const x = coord[1];
    const y = coord[0];

    for (let i = 0; i < ship.length; i++) {
        if (y + i > 9) {
            return false;
        }

        if (board[y + i][x]) {
            return false;
        }

        if (i === 0) {
            if (y - 1 >= 0) {
                if (board[y - 1][x]) {
                    return false;
                }
            }

            if (x - 1 >= 0) {
                if (board[y][x - 1]) {
                    return false;
                }
            }

            if (x + 1 < 10) {
                if (board[y][x + 1]) {
                    return false;
                }
            }
        } else if (i === ship.length - 1) {
            if ((y + i) + 1 < 10) {
                if (board[(y + i) + 1][x]) {
                    return false;
                }
            }

            if (x - 1 >= 0) {
                if (board[y + i][x - 1]) {
                    return false;
                }
            }

            if (y + 1 < 10) {
                if (board[y + i][x + 1]) {
                    return false;
                }
            }
        } else {
            if (x - 1 >= 0) {
                if (board[y + i][x - 1]) {
                    return false;
                }
            }

            if (y + 1 < 10) {
                if (board[y + i][x + 1]) {
                    return false;
                }
            }
        }
    }

    return true;
}

export { checkHorizontal, checkVertical }