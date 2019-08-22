let difficultMap = new Map([[1, "Easy"], [2, "Medium"], [3, "Hard"]]);
let userSign = localStorage.sign;
let turn = true;   //todo true human, false AI 
let difficulty = localStorage.difficulty; //todo 0 random 1 smarter 2 the smartest
let gameInProgress = true;
let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];
let freshBoard = [
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
    htmlYourSign.innerHTML = "<p>Your sign: " + localStorage.sign + "</p>";
    document.querySelector("#welcomeMessage").innerHTML = "<p>Hello " + localStorage.nick + " Let's play !</p>";
    htmlDifficulty.innerHTML = "<p>Difficulty level: " + difficulty + "</p>";
    htmlPoints.innerHTML = "<p>Your Points: 0</p>";
    htmlTurn.innerHTML = "<p>Actual Turn: Ai</p>";

    //todo allListeners

    // document.querySelector("#btc-increase").addEventListener("click", function () {
    //     increaseDifficulty(htmlDifficulty);
    // });
    // document.querySelector("#btc-decrease").addEventListener("click", function () {
    //     decreaseDifficulty(htmlDifficulty);
    // });
    document.querySelector("#btnReset").addEventListener("click", function () {
        resetBoard();
        refreshHtmlBoard(htmlAllSquares, freshBoard);
        gameInProgress = turn;
    });
    // document.querySelector("#btc-chooseSignX").addEventListener("click", function () {
    //     setUserSignX(htmlYourSign);
    // });
    // document.querySelector("#btc-chooseSignO").addEventListener("click", function () {
    //     setUserSignO(htmlYourSign);
    // });

    refreshHtmlBoard(htmlAllSquares, freshBoard);

    //todo init
    for (let i = 0; i < htmlAllSquares.length; i++) {
        htmlAllSquares[i].onclick = function () {
            if (htmlAllSquares[i].querySelector("p").innerHTML === " ") {
                //todo Human part
                if (gameInProgress) {
                    putMarkerOnBoard(coordinates[this.id], userSign);
                    refreshHtmlBoard(htmlAllSquares, board);
                    if (checkWin()) {
                        gameInProgress = false;
                        setTimeout(function () {
                            alert(localStorage.nick + "WON !!!");
                        }, 300);
                    }
                }
                //todo AI easy part
                if (gameInProgress) {
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
                        setTimeout(function () {
                            alert("AI WON !!!");
                        }, 300);
                    }
                }
                //todo END One round
            }
        };
    }
};

function resetBoard() {
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

function increaseDifficulty(htmlIncrease) {
    if (difficulty < 3 && difficulty++) {
        htmlIncrease.innerHTML = "<p>Difficulty: " + difficultMap.get(difficulty) + "</p>";
    }
}

function decreaseDifficulty(htmlIncrease) {
    if (difficulty > 1 && difficulty--) {
        htmlIncrease.innerHTML = "<p>Difficulty: " + difficultMap.get(difficulty) + "</p>";
    }
}

function setUserSignX(htmlYourSign) {
    userSign = "X";
    htmlYourSign.innerHTML = "<p>Your sign: " + userSign + "</p>";
}

function setUserSignO(htmlYourSign) {
    userSign = "O";
    htmlYourSign.innerHTML = "<p>Your sign: " + userSign + "</p>";
}

function putMarkerOnBoard(coordinates, value) {
    board[coordinates[0]][coordinates[1]] = value;
}

function checkWin() {
    if (checkRow() || checkColumn() || checkDiagonal()) {
        return turn;
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

