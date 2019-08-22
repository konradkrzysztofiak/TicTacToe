let difficultMap = new Map([[1, "easy"], [2, "medium"], [3, "hard"]]);
let nick = localStorage.nick;
let difficulty = localStorage.difficulty; //todo 1 random 2 smarter 3 the smartest
let userSign = localStorage.sign;
let userPoints = 0; //todo ----> We need write this in JSON <----
let turn = true;   //todo true human, false AI
let gameInProgress = true;
let firstMoveOfHardAi = false;
let startHardAiPos;
let startingPos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
    let htmlWelcomeMessage = document.querySelector("#welcomeMessage");

    initPlayerInfoBox();
    //todo allListeners
    document.querySelector("#btnReset").addEventListener("click", function () {
        resetBoard();
        refreshHtmlBoard(htmlAllSquares, board);
        gameInProgress = true;
    });


    //todo init
    for (let i = 0; i < htmlAllSquares.length; i++) {
        htmlAllSquares[i].onclick = function () {
            if (gameInProgress && turn) {
                putMarkerOnBoard(coordinates[this.id], userSign);
                refreshHtmlBoard(htmlAllSquares, board);
                if (checkWin()) {
                    gameInProgress = false;
                    winning = nick;
                    htmlPoints.innerHTML = "<p>Your Points: " + userPoints++ + "</p>";
                }
            }
            if (gameInProgress) {
                checkStateOfGame(htmlAllSquares);

                runAi(getValueFromMap(difficultMap, localStorage.difficulty));
                console.log(board);
            }

        };
        console.log("End of window.onload");
    }

    function runAi(difficulty) {
        if (gameInProgress && !turn) {
            if (difficulty === 1) {
                turnAIDummy(htmlAllSquares);
            } else if (difficulty === 2) {
                //todo medium
            } else if (difficulty === 3) {
                turnAiHard(htmlAllSquares);
            }
        }

        //todo END One round
    }

    function initPlayerInfoBox() {
        htmlYourSign.innerHTML = "<p>Your sign: " + localStorage.sign + "</p>";
        htmlWelcomeMessage.innerHTML = "<p>Hello " + nick + " Let's play !</p>";
        htmlDifficulty.innerHTML = "<p>Difficulty level: " + difficulty + "</p>";
        htmlPoints.innerHTML = "<p>Your Points: " + userPoints + "</p>";
        htmlTurn.innerHTML = "<p>Actual Turn: Ai</p>";
    }
};

function getValueFromMap(map, data) {
    for (let [key, value] of map.entries()) {
        if (value === data)
            return key;
    }
}

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
    turn = true;

}

function turnAiHard(htmlAllSquares) {




    while (true) {

        for (let i = 0; i < startingPos.length; i++) {
            if (!firstMoveOfHardAi && !turn) {
                if (board[coordinates[startingPos[i]][0]][coordinates[startingPos[i]][1]] === " ") {
                    startHardAiPos = startingPos[i];
                    board[coordinates[startHardAiPos][0]][coordinates[startHardAiPos][1]] = (userSign === "X") ? "O" : "X";
                    firstMoveOfHardAi = true;
                    turn = true;
                    break;
                }
            } else {
                blockPlayerMoveHorizontal();
                checkHorizontalMove(htmlAllSquares);
                refreshHtmlBoard(htmlAllSquares, board);
                turn = true;
                break;
            }
        }
        break;


    }

    refreshHtmlBoard(htmlAllSquares, board);
    if (checkWin()) {
        gameInProgress = false;
        winning = "AI hard";
    }
    turn = true;
}

function checkHorizontalMove(htmlAllSquares) {
    if (!turn) {
        console.log(startHardAiPos);
        startHardAiPos = startHardAiPos + 3;
        console.log(coordinates[startHardAiPos]);
        if (board[coordinates[startHardAiPos][0]][coordinates[startHardAiPos][1]] === " ") {
            board[coordinates[startHardAiPos][0]][coordinates[startHardAiPos][1]] = (userSign === "X") ? "O" : "X";
            turn = true;
        } else {
            firstMoveOfHardAi = false;
            turnAiHard(htmlAllSquares);
        }
    }
}

function blockPlayerMoveHorizontal() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[j][i] === userSign || board[j][i] === " ") {
                if (j < 1) {
                    if (board[j][i] === userSign && board[j + 1][i] === userSign) {
                        board[j+2][i] = "O";
                    }
                } else if (j < 2) {
                    if (board[j][i] === userSign && board[j + 1][i] === userSign){
                        board[j-1][i] = "O";
                    }

                }
            }
        }
    }
}

function checkStateOfGame(htmlAllSquares) {
    if (!gameInProgress || checkIfBoardFull()) {
        winning = "";
        refreshHtmlBoard(htmlAllSquares, board);
        gameInProgress = false;
        if (winning === "") {
            refreshHtmlBoard(htmlAllSquares, board);
        }

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
    turn = true;
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
        turn = !turn;
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

