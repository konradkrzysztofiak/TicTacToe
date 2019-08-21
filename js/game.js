let difficultMap = new Map([[1, "Easy"], [2, "Medium"], [3, "Hard"]]);
let userSign = "X";
let turn = true;   //todo true human, false AI
let difficulty = 1; //todo 0 random 1 smarter 2 the smartest
let gameInProgress = false;
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
    htmlYourSign.innerHTML = "<p>Your sign: " + userSign + "</p>";
    document.querySelector("#welcomeMessage").innerHTML = "<p>" + localStorage.nick + " Let's play !</p>";
    htmlDifficulty.innerHTML = "<p>Difficulty: " + difficultMap.get(difficulty) + "</p>";


    //todo allListeners
    document.querySelector("#btc-increase").addEventListener("click", function () {
        increaseDifficulty(htmlDifficulty);
    });
    document.querySelector("#btc-decrease").addEventListener("click", function () {
        decreaseDifficulty(htmlDifficulty);
    });
    document.querySelector("#btnReset").addEventListener("click", function (event) {
        refreshHtmlBoard(htmlAllSquares)
    });
    document.querySelector("#btc-chooseSignX").addEventListener("click", function () {
        setUserSignX(htmlYourSign);
    });
    document.querySelector("#btc-chooseSignO").addEventListener("click", function () {
        setUserSignO(htmlYourSign);
    });


    //todo init
    for (let i = 0; i < htmlAllSquares.length; i++) {
        htmlAllSquares[i].onclick = function () {
            if (htmlAllSquares[i].querySelector("p").innerHTML === " ") {
                htmlAllSquares[i].querySelector("p").innerHTML = userSign;
                fillBoard(coordinates[this.id], userSign);
                gameInProgress = true;
                // if (gameStart) {
                //     if (turn && htmlAllSquares[i].querySelector("p").innerHTML !== "O") {
                //         htmlAllSquares[i].querySelector("p").innerHTML = "X";
                //
                //
                //     }
                // }
            }
        };
    }
    refreshHtmlBoard(htmlAllSquares, freshBoard);
};

function refreshHtmlBoard(htmlSquares, bordIn) {
    let z = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            console.log(bordIn[y][x]);
            htmlSquares[z++].querySelector("p").innerHTML = bordIn[y][x];
        }
    }
}

function increaseDifficulty(htmlIncrease) {
    console.log(difficulty);
    if (difficulty < 3 && difficulty++) {
        htmlIncrease.innerHTML = "<p>Difficulty: " + difficultMap.get(difficulty) + "</p>";
    }
}

function decreaseDifficulty(htmlIncrease) {
    console.log(difficulty);
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

function fillBoard(coordinates, value) {
    board[coordinates[0]][coordinates[1]] = value;
}

function checkWin() {
    if (checkRow() || checkColumn()) {
        alert("U win!");
        gameStart = false;
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

