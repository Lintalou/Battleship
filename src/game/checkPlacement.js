function checkHorizontal(board, ship, coord) {
    for (let i = 0; i < ship.length; i++) {
        if (coord[1] + i > 9) {
            return false;
        }

        if (board[coord[0]][coord[1] + i]) {
            return false;
        }

        if (i === 0) {
            if (board[coord[0]][coord[1] - 1]) {
                return false;
            }

            if (coord[0] - 1 >= 0) {
                if (board[coord[0] - 1][coord[1]]) {
                    return false;
                }
            }

            if (coord[0] + 1 < 10) {
                if (board[coord[0] + 1][coord[1]]) {
                    return false;
                }
            }
        } else if (i === ship.length - 1) {
            if (board[coord[0]][(coord[1] + i) + 1]) {
                return false;
            }

            if (coord[0] - 1 >= 0) {
                if (board[coord[0] - 1][coord[1] + i]) {
                    return false;
                }
            }

            if (coord[0] + 1 < 10) {
                if (board[coord[0] + 1][coord[1] + i]) {
                    return false;
                }
            }
        } else {
            if (coord[0] - 1 >= 0) {
                if (board[coord[0] - 1][coord[1] + i]) {
                    return false;
                }
            }

            if (coord[0] + 1 < 10) {
                if (board[coord[0] + 1][coord[1] + i]) {
                    return false;
                }
            }
        }
    }

    return true;
}

function checkVertical(board, ship, coord) {
    for (let i = 0; i < ship.length; i++) {
        if (coord[0] + i > 9) {
            return false;
        }

        if (board[coord[0] + i][coord[1]]) {
            return false;
        }

        if (i === 0) {
            if (coord[0] - 1 >= 0) {
                if (board[coord[0] - 1][coord[1]]) {
                    return false;
                }
            }

            if (coord[1] - 1 >= 0) {
                if (board[coord[0]][coord[1] - 1]) {
                    return false;
                }
            }

            if (coord[1] + 1 < 10) {
                if (board[coord[0]][coord[1] + 1]) {
                    return false;
                }
            }
        } else if (i === ship.length - 1) {
            if ((coord[0] + i) + 1 < 10) {
                if (board[(coord[0] + i) + 1][coord[1]]) {
                    return false;
                }
            }

            if (coord[1] - 1 >= 0) {
                if (board[coord[0] + i][coord[1] - 1]) {
                    return false;
                }
            }

            if (coord[0] + 1 < 10) {
                if (board[coord[0] + i][coord[1] + 1]) {
                    return false;
                }
            }
        } else {
            if (coord[1] - 1 >= 0) {
                if (board[coord[0] + i][coord[1] - 1]) {
                    return false;
                }
            }

            if (coord[0] + 1 < 10) {
                if (board[coord[0] + i][coord[1] + 1]) {
                    return false;
                }
            }
        }
    }

    return true;
}

export { checkHorizontal, checkVertical }