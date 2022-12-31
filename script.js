/**
 * Board module to play on:
 *    Variables:
 *         - board array = array[9]
 *         - turn = Player X || Player O
 *    
 *    Functions:
 *         - Reset, clears board, params = none
 *         - CheckStatus, checks if someone won or the game is a draw, params = none
 *           
 *         - InsertChoice, inserts x or o in a selected position, params = Player.name, board.position
 *         - changeTurn, alternates turns between x and o;
 * 
 * 
 * Player object:
 *      Variables:
 *          - Name (x or o)
 *        
 * 
 * 
 */

function equalityChecker(player, ...args) {
    return args.every(val => val === player);
}

Array.prototype.select_elements = function(...indices) {
    var elements = [];
    for (var i=0; i != indices.length; ++i)
        elements.push(this[indices[i]]);
    return elements;
}


const player = function(name) {
    return {name};
}

const playerX = player("X");
const playerO = player("O");

const board = (function() {
    let boardArray = new Array(9).fill(null);
    let currPlayer = "X";

    const reset = () => {
        boardArray.fill(null);
    };

    const insertChoice = (player, position) => {
        boardArray[position] = player.name;
    }

    const changeTurn = () => {
        switch(currPlayer) {
            case "X":
                currPlayer = "O";
                break;
            case "O":
                currPlayer = "X";
                break;
        }
    }

    const checkWin = () => {
        for (const cell of boardArray) {
            if (cell == null) {
                break;
            } else {
                return "Draw";
            }
        }

        if (equalityChecker(currPlayer, ...boardArray.slice(0, 2)) || equalityChecker(currPlayer, ...boardArray.slice(3, 6)) || 
        equalityChecker(currPlayer, ...boardArray.slice(-3)) || equalityChecker(currPlayer, boardArray.select_elements(0, 3, 6)) || 
        equalityChecker(currPlayer, boardArray.select_elements(1, 4, 7)) || equalityChecker(currPlayer, boardArray.select_elements(2, 5, 8)) || 
        equalityChecker(currPlayer, boardArray.select_elements(0, 4, 8)) || equalityChecker(currPlayer, boardArray.select_elements(2, 4, 6))) {
            return `${currPlayer} wins!`;
        }


        /**
         * win conditions:
         * 0 1 2
         * 3 4 5
         * 6 7 8
         * 
         * 0 3 6
         * 1 4 7
         * 2 5 8
         * 
         * 0 4 8
         * 2 4 6
         */

        
    }



})();