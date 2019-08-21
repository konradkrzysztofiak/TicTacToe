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



window.onload = function (){
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
        htmlAllSquares[i].onclick = function(){
            if (turn && htmlAllSquares[i].querySelector("p").innerHTML === " ") {
                htmlAllSquares[i].querySelector("p").innerHTML = userSign;

                gameInProgress = true;
            }
        }
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