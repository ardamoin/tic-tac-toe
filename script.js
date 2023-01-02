const cells = document.querySelector(".board").querySelectorAll("td");
const playerTurn = document.querySelector(".turn");
const restartBtn = document.querySelector(".restart");
let currPlayer = "X";

function equalityChecker(player, ...args) {
    return args.every(val => val == player);
}

const changeTurn = () => {
    if (currPlayer === "X") {
        currPlayer = "O";
    } else if (currPlayer === "O") {
        currPlayer = "X";
    }
}

Array.prototype.select_elements = function(...args) {
    var elements = [];
    for (var i=0; i != args.length; ++i)
        elements.push(this[args[i]]);
    return elements;
}



const board = (function() {
    let boardArray = new Array(9).fill("");

    const reset = () => {
        boardArray.fill("");
    };

    const insertChoice = (player, position) => {
        boardArray[position] = player;
    }

    const checkWin = () => {
        if (equalityChecker(currPlayer, ...boardArray.slice(0, 3)) || equalityChecker(currPlayer, ...boardArray.slice(3, 6)) || 
        equalityChecker(currPlayer, ...boardArray.slice(-3)) || equalityChecker(currPlayer, ...boardArray.select_elements(0, 3, 6)) || 
        equalityChecker(currPlayer, ...boardArray.select_elements(1, 4, 7)) || equalityChecker(currPlayer, ...boardArray.select_elements(2, 5, 8)) || 
        equalityChecker(currPlayer, ...boardArray.select_elements(0, 4, 8)) || equalityChecker(currPlayer, ...boardArray.select_elements(2, 4, 6))) {
            return `${currPlayer} wins!`;

        } else if (!boardArray.includes("")) {
            return "Draw"
        }

        return "";
    }


    return {boardArray, reset, insertChoice, checkWin};
})();

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        

        
        if (this.textContent == "" && playerTurn !== "Draw" && !playerTurn.textContent.includes("wins")) {
            this.textContent = currPlayer;
            board.insertChoice(currPlayer, +this.className);
            if (board.checkWin() !== "") {
                playerTurn.textContent = board.checkWin();
            } else {
                changeTurn();
                playerTurn.textContent = `Player ${currPlayer}'s turn`;
            }
            
        }

    })
});

restartBtn.addEventListener('click', () => {
    board.reset();
    Array.from(cells).map(cell => cell.textContent = "");
    playerTurn.textContent = "Player X's turn";
    currPlayer = "X";
});
