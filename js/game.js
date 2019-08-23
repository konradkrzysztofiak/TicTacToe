let nick = localStorage.nick;
let difficulty = localStorage.difficulty;
let userSign = localStorage.sign;
let userPoints = 0;
let AIPoints = 0;
let turn = "human";
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
    let htmlUserPoints = document.querySelector("#userPoints");
    let htmlAIPoints = document.querySelector("#AIPoints");
    let htmlTurn = document.querySelector("#turn");
    let htmlWinnerIsMessage = document.querySelector("#winnerIsMessage");
    htmlYourSign.innerHTML = `Your sign: ${localStorage.sign}`;
    document.querySelector("#welcomeMessage").innerHTML = `Hello ${nick} Let's play !`;
    htmlDifficulty.innerHTML = `Difficulty level: ${difficulty}`;
    htmlUserPoints.innerHTML = `Your Points: ${userPoints}`;
    htmlAIPoints.innerHTML = `AI Points: ${AIPoints}`;
    htmlTurn.innerHTML = `Actual Turn: ${(turn === "human") ? "Your's" : "AI"}`;
    htmlWinnerIsMessage.innerHTML = "Winner is: ";


    //todo allListeners
    document.querySelector("#btnReset").addEventListener("click", function () {
        resetBoard();
        refreshHtmlBoard(htmlAllSquares, board);
        turn = "human"; //todo <--- make this random !!!
    });
    document.querySelector("#btcPlayAgain").addEventListener("click", function () {
        resetBoard();
        refreshHtmlBoard(htmlAllSquares, board);
        turn = "human"; //todo <--- make this random !!!
    });
    document.querySelector("#btcSave").addEventListener("click", function () {
        savePoints(htmlUserPoints);
    });


    //todo init
    for (let i = 0; i < htmlAllSquares.length; i++) {
        htmlAllSquares[i].onclick = function () {
            //todo Human part
            if (turn === "human") {
                turn = (putMarkerOnBoard(coordinates[this.id], userSign)) ? "AI" : "human";
                refreshHtmlBoard(htmlAllSquares, board);
                if (checkWin()) {
                    winning = nick;
                    htmlUserPoints.innerHTML = `Your Points: ${++userPoints}`;
                    htmlWinnerIsMessage.innerHTML = `Winner is: ${winning} `;
                    turn = "";
                }
                if (checkDraw() && turn !== "") {
                    htmlWinnerIsMessage.innerHTML = " !!! DRAW !!! ";
                    turn = "";
                }
            }


            //todo AI easy part
            if (turn === "AI") {
                if (difficulty === "easy") {
                    turnAIDummy(htmlAllSquares);
                } else if (difficulty === "medium") {
                    turnAIMedium(htmlAllSquares);
                } else {
                    turnAIHard(htmlAllSquares);
                }
                // refreshHtmlBoard(htmlAllSquares, board);
                turn = "human";
                if (checkWin()) {
                    winning = "AI";
                    htmlAIPoints.innerHTML = `AI Points: ${++AIPoints}`;
                    htmlWinnerIsMessage.innerHTML = `Winner is: ${winning} `;
                    turn = "";
                }
                if (checkDraw() && turn !== "") {
                    htmlWinnerIsMessage.innerHTML = " !!! DRAW !!! ";
                    turn = "";
                }
                refreshHtmlBoard(htmlAllSquares, board);
            }
            //todo END One round
        };
    }
    console.log("End of window.onload");
};

function savePoints(htmlUserPoints) {
    let playersFromLocalStorage = [];
    if (localStorage.players === undefined) {
        playersFromLocalStorage.push({playerName: nick, score: userPoints});
        localStorage.players = JSON.stringify(playersFromLocalStorage);
    } else {
        playersFromLocalStorage = JSON.parse(localStorage.players);
        let userInStorage = false;
        for (let i in playersFromLocalStorage) {
            if (nick === playersFromLocalStorage[i].playerName) {
                playersFromLocalStorage[i].score += userPoints;
                userPoints = 0;
                htmlUserPoints.innerHTML = `Your Points: ${userPoints}`;
                userInStorage = true;
                break;
            }
        }
        if (!userInStorage) {
            playersFromLocalStorage.push({playerName: nick, score: userPoints});
        }
    }
    function compare(a, b) {
        return b.score - a.score;
    }
    playersFromLocalStorage.sort(compare);
    localStorage.players = JSON.stringify(playersFromLocalStorage);
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
}

function turnAIMedium(htmlAllSquares) {
    let AISign = (userSign === "X") ? "O" : "X";
    if (board[1][1] === " ") {
        board[1][1] = AISign;
        return;
    }
    while (true) {
        for (let y = 0; y < 3; y++) {
            if (board[y][0] === AISign && board[y][1] === AISign && board[y][2] === " ") {
                board[y][2] = AISign;
                return;
            }
            if (board[y][1] === AISign && board[y][2] === AISign && board[y][0] === " ") {
                board[y][0] = AISign;
                return;
            }
            if (board[y][2] === AISign && board[y][0] === AISign && board[y][1] === " ") {
                board[y][1] = AISign;
                return;
            }
            if (board[0][y] === AISign && board[1][y] === AISign && board[2][y] === " ") {
                board[2][y] = AISign;
                return;
            }
            if (board[1][y] === AISign && board[2][y] === AISign && board[0][y] === " ") {
                board[0][y] = AISign;
                return;
            }
            if (board[2][y] === AISign && board[0][y] === AISign && board[0][y] === " ") {
                board[1][y] = AISign;
                return;
            }
        }
        if (board[0][0] === AISign && board[1][1] === AISign && board[2][2] === " ") {
            board[2][2] = AISign;
            return;
        }
        if (board[0][2] === AISign && board[1][1] === AISign && board[2][0] === " ") {
            board[2][0] = AISign;
            return;
        }
        if (board[2][2] === AISign && board[1][1] === AISign && board[0][0] === " ") {
            board[0][0] = AISign;
            return;
        }
        if (board[2][0] === AISign && board[1][1] === AISign && board[0][2] === " ") {
            board[0][2] = AISign;
            return;
        }


        let y = Math.round(Math.random() * 2);
        let x = Math.round(Math.random() * 2);
        if (board[y][x] === " ") {
            board[y][x] = (userSign === "X") ? "O" : "X";
            break;
        }
    }
}

function turnAIHard(htmlAllSquares) {
    let AISign = (userSign === "X") ? "O" : "X";
    if (board[1][1] === " ") {
        board[1][1] = AISign;
        return;
    }
    while (true) {
        for (let y = 0; y < 3; y++) {
            if (board[y][0] === AISign && board[y][1] === AISign && board[y][2] === " ") {
                board[y][2] = AISign;
                return;
            }
            if (board[y][1] === AISign && board[y][2] === AISign && board[y][0] === " ") {
                board[y][0] = AISign;
                return;
            }
            if (board[y][2] === AISign && board[y][0] === AISign && board[y][1] === " ") {
                board[y][1] = AISign;
                return;
            }
            if (board[0][y] === AISign && board[1][y] === AISign && board[2][y] === " ") {
                board[2][y] = AISign;
                return;
            }
            if (board[1][y] === AISign && board[2][y] === AISign && board[0][y] === " ") {
                board[0][y] = AISign;
                return;
            }
            if (board[2][y] === AISign && board[0][y] === AISign && board[0][y] === " ") {
                board[1][y] = AISign;
                return;
            }
        }
        if (board[0][0] === AISign && board[1][1] === AISign && board[2][2] === " ") {
            board[2][2] = AISign;
            return;
        }
        if (board[0][2] === AISign && board[1][1] === AISign && board[2][0] === " ") {
            board[2][0] = AISign;
            return;
        }
        if (board[2][2] === AISign && board[1][1] === AISign && board[0][0] === " ") {
            board[0][0] = AISign;
            return;
        }
        if (board[2][0] === AISign && board[1][1] === AISign && board[0][2] === " ") {
            board[0][2] = AISign;
            return;
        }

        for (let y = 0; y < 3; y++) {
            if (board[y][0] === userSign && board[y][1] === userSign && board[y][2] === " ") {
                board[y][2] = AISign;
                return;
            }
            if (board[y][1] === userSign && board[y][2] === userSign && board[y][0] === " ") {
                board[y][0] = AISign;
                return;
            }
            if (board[y][2] === userSign && board[y][0] === userSign && board[y][1] === " ") {
                board[y][1] = AISign;
                return;
            }
            if (board[0][y] === userSign && board[1][y] === userSign && board[2][y] === " ") {
                board[2][y] = AISign;
                return;
            }
            if (board[1][y] === userSign && board[2][y] === userSign && board[0][y] === " ") {
                board[0][y] = AISign;
                return;
            }
            if (board[2][y] === userSign && board[0][y] === userSign && board[0][y] === " ") {
                board[1][y] = AISign;
                return;
            }
        }
        if (board[0][0] === userSign && board[1][1] === userSign && board[2][2] === " ") {
            board[2][2] = AISign;
            return;
        }
        if (board[0][2] === userSign && board[1][1] === userSign && board[2][0] === " ") {
            board[2][0] = AISign;
            return;
        }
        if (board[2][2] === userSign && board[1][1] === userSign && board[0][0] === " ") {
            board[0][0] = AISign;
            return;
        }
        if (board[2][0] === userSign && board[1][1] === userSign && board[0][2] === " ") {
            board[0][2] = AISign;
            return;
        }


        let y = Math.round(Math.random() * 2);
        let x = Math.round(Math.random() * 2);
        if (board[y][x] === " ") {
            board[y][x] = (userSign === "X") ? "O" : "X";
            break;
        }
    }
}


function checkDraw() {
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
        return true;
    }
    return false;
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


//todo ------------------HARD--------------------
function turnAiHard(htmlAllSquares) {


    while (true) {

        for (let i = 0; i < startingPos.length; i++) {
            if (!turn) {
                if (!firstMoveOfHardAi) {
                    if (board[coordinates[startingPos[i]][0]][coordinates[startingPos[i]][1]] === " ") {
                        startHardAiPos = startingPos[i];
                        console.log("hello");
                        board[coordinates[startHardAiPos][0]][coordinates[startHardAiPos][1]] = (userSign === "X") ? "O" : "X";
                        firstMoveOfHardAi = true;
                        turn = true;
                        break;
                    }
                } else {
                    blockPlayerMoveHorizontal();
                    refreshHtmlBoard(htmlAllSquares, board);
                    moveHorizontal(htmlAllSquares);

                    turn = true;
                    break;
                }
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

function moveHorizontal(htmlAllSquares) {
    if (!turn) {
        console.log("moveHorizontal");
        startHardAiPos = startHardAiPos + 3;
        if (board[coordinates[startHardAiPos][0]][coordinates[startHardAiPos][1]] === " ") {
            board[coordinates[startHardAiPos][0]][coordinates[startHardAiPos][1]] = (userSign === "X") ? "O" : "X";
            turn = true;
        } else {
            console.log("moveHorizontalFalse");
            //firstMoveOfHardAi = false;
            //turnAiHard(htmlAllSquares);
        }
    }
}

function blockPlayerMoveHorizontal() {

    if (!turn) {
        console.log("blockHorizontal");
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] === userSign || board[j][i] === " ") {
                    if (j < 1) {
                        if (board[j][i] === userSign && board[j + 1][i] === userSign && board[j + 2][i] === " ") {
                            board[j + 2][i] = "O";
                            turn = true;
                        }
                    } else if (j < 2) {
                        if (board[j][i] === userSign && board[j + 1][i] === userSign && board[j - 1][i] === " ") {
                            board[j - 1][i] = "O";
                            turn = true;
                        }

                    }
                } else {
                    blockPlayerMoveDiagonal();
                }
            }
        }
    }
}

function blockPlayerMoveDiagonal() {
    if (!turn && checkPlayerMoveDiagonal()) {
        console.log("blockDiagonal");
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] === userSign) {
                    if (j < 1) {
                        if (board[j][i] === userSign && board[j + 1][i + 1] === userSign) {
                            board[j + 2][i + 2] = "O";
                            turn = true;
                        } else if (board[j][i] === userSign && board[j + 2][i - 1] === userSign) {
                            board[j + 2][i - 2] = "O";
                            turn = true;
                        }
                    } else if (j < 2) {
                        if (board[j][i] === userSign && board[j + 1][i - 1] === userSign && board[j - 1][i + 1] === " ") {
                            board[j - 1][i + 1] = "O";
                            turn = true;
                        } else if (board[j][i] === userSign && board[j + 1][i - 1] === userSign && board[j - 1][i + 1] === " ") {
                            board[j - 1][i + 1] = "O";
                            turn = true;
                        }
                    }
                }
            }
        }
    } else {
        blockPlayerMoveVertical();
    }
}

function checkPlayerMoveDiagonal() {
    if (!turn) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] === userSign) {
                    if (j < 1) {
                        if (board[j][i] === userSign && board[j + 1][i + 1] === userSign && board[j + 2][i + 2] === " ") {
                            return true;
                        } else if (board[j][i] === userSign && board[j + 2][i - 1] === userSign && board[j + 2][i - 2] === " ") {
                            return true;
                        }
                    } else if (j < 2) {

                        if (board[j][i] === userSign && board[j + 1][i - 1] === userSign && board[j - 1][i + 1] === " ") {
                            return true;
                        } else if (board[j][i] === userSign && board[j - 1][i + 1] === userSign && board[j - 1][i + 1] === " ") {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

}

function blockPlayerMoveVertical() {
    if (!turn) {
        console.log("blockVertical");
        for (let j = 0; j < board.length; j++) {
            for (let i = 0; i <= board.length; i++) {
                console.log("hello");
                if (board[j][i] === userSign) {
                    if (board[j][i] === userSign && board[j][i] === userSign && board[j][i + 2] === " ") {
                        board[j][i + 2] = (userSign === "X") ? "O" : "X";
                        turn = true;
                        break;
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
