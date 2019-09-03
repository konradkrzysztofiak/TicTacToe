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
    let {htmlAllSquares, htmlUserPoints, htmlAIPoints, htmlWinnerIsMessage} = initHTMLs();

    document.querySelector("#btnReset").addEventListener("click", function () {
        btcPlayAgain(htmlAllSquares, htmlAIPoints, htmlWinnerIsMessage);
    });
    document.querySelector("#btcPlayAgain").addEventListener("click", function () {
        btcPlayAgain(htmlAllSquares, htmlAIPoints, htmlWinnerIsMessage);
    });
    document.querySelector("#btcSave").addEventListener("click", function () {
        btcSavePoints(htmlUserPoints);
    });


    for (let i = 0; i < htmlAllSquares.length; i++) {
        htmlAllSquares[i].onclick = function () {
            if (turn === "human") {
                turn = (putMarkerOnBoard(coordinates[this.id], userSign)) ? "AI" : "human";
                console.log(htmlAllSquares);
                refreshHtmlBoard(htmlAllSquares, board);
                if (checkWin()) {
                    winning = nick;
                    htmlUserPoints.innerHTML = `Your Points: ${++userPoints}`;
                    htmlWinnerIsMessage.innerHTML = `Winner is: ${winning} `;
                    turn = "";
                }
                refreshHtmlBoard(htmlAllSquares, board);
                if (checkDraw() && turn !== "") {
                    htmlWinnerIsMessage.innerHTML = " !!! DRAW !!! ";
                    turn = "";
                }
                refreshHtmlBoard(htmlAllSquares, board);
            }
            turnAI(htmlAllSquares, htmlAIPoints, htmlWinnerIsMessage);
        };
    }
};

function btcPlayAgain(htmlAllSquares, htmlAIPoints, htmlWinnerIsMessage) {
    resetBoard();
    refreshHtmlBoard(htmlAllSquares, board);
    turn = (Math.round(Math.random()) === 1) ? "human" : "AI";
    if (turn === "AI") {
        turnAI(htmlAllSquares, htmlAIPoints, htmlWinnerIsMessage);

    }
}

function btcSavePoints(htmlUserPoints) {
    let playersFromLocalStorage = [];
    if (localStorage.players === undefined) {
        playersFromLocalStorage.push({playerName: nick, score: userPoints});
        localStorage.players = JSON.stringify(playersFromLocalStorage);
    } else {
        const __ret = handleUser(playersFromLocalStorage, htmlUserPoints);
        playersFromLocalStorage = __ret.playersFromLocalStorage;
        let userInStorage = __ret.userInStorage;
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

function handleUser(playersFromLocalStorage, htmlUserPoints) {
    playersFromLocalStorage = JSON.parse(localStorage.players);
    let userInStorage = false;
    for (let i = 0; i < playersFromLocalStorage.length; i++) {
        if (nick === playersFromLocalStorage[i].playerName) {
            playersFromLocalStorage[i].score += userPoints;
            userPoints = 0;
            htmlUserPoints.innerHTML = `Your Points: ${userPoints}`;
            userInStorage = true;
            break;
        }
    }
    return {playersFromLocalStorage, userInStorage};
}

function turnAI(htmlAllSquares, htmlAIPoints, htmlWinnerIsMessage) {
    if (turn === "AI") {
        if (difficulty === "easy") {
            turnAIDummy(htmlAllSquares);
        } else if (difficulty === "medium") {
            turnAIMedium(htmlAllSquares);
        } else {
            turnAIHard(htmlAllSquares);
        }
        refreshHtmlBoard(htmlAllSquares, board);
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
}

function turnAIDummy() {
    while (true) {
        let y = Math.round(Math.random() * 2);
        let x = Math.round(Math.random() * 2);
        if (board[y][x] === " ") {
            board[y][x] = (userSign === "X") ? "O" : "X";
            break;
        }
    }
}

function turnAIMedium() {
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

function turnAIHard() {
    let AISign = (userSign === "X") ? "O" : "X";
    if (board[1][1] === " ") {
        board[1][1] = AISign;
        return;
    }
    while (true) {
        for (let y = 0; y < 3; y++) {
            if (board[y][0] === AISign && board[y][1] === AISign && board[y][2] === " ") {
                board[y][2] = AISig.n;
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


function refreshHtmlBoard(htmlSquares, inBoard) {
    let z = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            htmlSquares[z++].querySelector("p").innerHTML = inBoard[y][x];
        }
    }
}


