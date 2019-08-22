let difficultMap = new Map([[1, "Easy"], [2, "Medium"], [3, "Hard"]]);
let nick = localStorage.nick;
let difficulty = localStorage.difficulty; //todo 0 random 1 smarter 2 the smartest
let userSign = localStorage.sign;
let userPoints = 0; //todo ----> We need write this in JSON <----
let turn = "human";   //todo <--- I had to change this ....>
let gameInProgress = true;
let winning = "";
let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

let coordinates = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2]
};


window.onload = function () {
    // todo allHTMLs
    let htmlAllSquares = document.querySelectorAll(".square");
    let htmlDifficulty = document.querySelector("#difficultMessage");
    let htmlYourSign = document.querySelector("#chooseSignMessage");
    let htmlPoints = document.querySelector("#points");
    let htmlTurn = document.querySelector("#turn");
    let htmlWinnerIsMessage = document.querySelector("#winnerIsMessage");
    htmlYourSign.innerHTML = "<p>Your sign: " + localStorage.sign + "</p>";
    document.querySelector("#welcomeMessage").innerHTML = "<p>Hello " + nick + " Let's play !</p>";
    htmlDifficulty.innerHTML = "<p>Difficulty level: " + difficulty + "</p>";
    htmlPoints.innerHTML = "<p>Your Points: " + userPoints + "</p>";
    htmlTurn.innerHTML = "<p>Actual Turn: " + ((turn === "human")?"Your's":"AI") + "</p>";
    htmlWinnerIsMessage.innerHTML = "<p>Winner is: </p>";

    //todo allListeners
    document.querySelector("#btnReset").addEventListener("click", function () {
        resetBoard();
        refreshHtmlBoard(htmlAllSquares, freshBoard);
        gameInProgress = true;
    });
    document.querySelector("#btcPlayAgain").addEventListener("click", function () {
        console.log("test \"btcPlayAgain\"");
        turn = "human"; //todo <--- make this random !!!
        gameInProgress = true;
    });

    // refreshHtmlBoard(htmlAllSquares, board);

    //todo init
    for (let i = 0; i < htmlAllSquares.length; i++) {
        htmlAllSquares[i].onclick = function () {
        //todo Human part
        if (gameInProgress && turn === "human") {
            putMarkerOnBoard(coordinates[this.id], userSign);
            refreshHtmlBoard(htmlAllSquares, board);
            if (checkWin()) {
                gameInProgress = false;
                winning = nick;
                htmlPoints.innerHTML = "<p>Your Points: " + ++userPoints + "</p>";
            }
            checkStateOfGame(htmlAllSquares, htmlWinnerIsMessage);
            turn = "AI";
        }


        //todo AI easy part
        if (gameInProgress && turn === "AI") {
            turnAIDummy(htmlAllSquares);
            checkStateOfGame(htmlAllSquares, htmlWinnerIsMessage);
        }
        //todo END One round
        };
    }
    console.log("End of window.onload");
};

function turnAIDummy(htmlAllSquares) {
    while (true) {
        let y = Math.round(Math.random() * 2);
        let x = Math.round(Math.random() * 2);
        if (board[y][x] === " ") {
            board[y][x] = (userSign === "X") ? "O" : "X";
            break;
        }
    }
    refreshHtmlBoard(htmlAllSquares, board);
    if (checkWin()) {
        gameInProgress = false;
        winning = "AI dummy";
    }
    turn = "human";
}

function checkStateOfGame(htmlAllSquares, htmlWinnerIsMessage) {
    if (!gameInProgress || checkIfBoardFull()) {
        if (winning === "") {
            htmlWinnerIsMessage.innerHTML = "<p> !!! DRAW !!! </p>";
            // setTimeout(function () {
            //     alert("Remiss !!!");
            // }, 500);

        } else {
            htmlWinnerIsMessage.innerHTML = "<p>Winner is: " + winning + " </p>";
            // let temporaryMessage = "Winner is " + winning + " !!!";
            // setTimeout(function () {
            //     alert(temporaryMessage);
            // }, 500);
        }
        winning = "";
        turn = "";
        resetBoard();
        gameInProgress = false;
        setTimeout(function () {
            // winning = "";
            // turn = "";
            // resetBoard();
            // gameInProgress = true;
            refreshHtmlBoard(htmlAllSquares, board);
        }, 1000);
    }
}

function checkIfBoardFull() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[y][x] === " ") {
                return false;
            }
        }
    }
    return true;
}

function resetBoard() {
    // board = freshBoard;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            board[y][x] = " ";
        }
    }
}

function refreshHtmlBoard(htmlSquares, bordIn) {
    let z = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            htmlSquares[z++].querySelector("p").innerHTML = bordIn[y][x];
        }
    }
}


function putMarkerOnBoard(coordinates, value) {
    if (board[coordinates[0]][coordinates[1]] === " ") {
        board[coordinates[0]][coordinates[1]] = value;
        turn = (turn === "human") ? "AI" : "human";
        // turn = !turn;
    }
}

function checkWin() {
    if (checkRow() || checkColumn() || checkDiagonal()) {
        return true;
    }
}

function checkRow() {
    for (let j = 0; j < board.length; j++) {
        for (let i = 0; i <= board[j].length; i++) {
            if (board[j][i] !== " ") {
                let firstInRow = board[j][0];
                if (board[j][i + 1] === firstInRow && board[j][i + 2] === firstInRow) {
                    return true;
                }
            }
        }
    }
}

function checkColumn() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[j][i] !== " ") {
                let firstInColumn = board[j][i];
                if (j < 1) {
                    if (board[j + 1][i] === firstInColumn && board[j + 2][i] === firstInColumn) {
                        return true;
                    }
                }
            }
        }
    }
}

function checkDiagonal() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[j][i] !== " ") {
                let firstSign = board[0][i];
                if (j < 1) {
                    if (board[j + 1][i + 1] === firstSign && board[j + 2][i + 2] === firstSign ||
                        board[j + 1][i - 1] === firstSign && board[j + 2][i - 2] === firstSign) {
                        return true;
                    }
                }
            }

        }
    }
}

// function increaseDifficulty(htmlIncrease) {
//     if (difficulty < 3 && difficulty++) {
//         htmlIncrease.innerHTML = "<p>Difficulty: " + difficultMap.get(difficulty) + "</p>";
//     }
// }
//
// function decreaseDifficulty(htmlIncrease) {
//     if (difficulty > 1 && difficulty--) {
//         htmlIncrease.innerHTML = "<p>Difficulty: " + difficultMap.get(difficulty) + "</p>";
//     }
// }
//
// function setUserSignX(htmlYourSign) {
//     userSign = "X";
//     htmlYourSign.innerHTML = "<p>Your sign: " + userSign + "</p>";
// }
//
// function setUserSignO(htmlYourSign) {
//     userSign = "O";
//     htmlYourSign.innerHTML = "<p>Your sign: " + userSign + "</p>";
// }
