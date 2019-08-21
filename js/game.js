let difficultMap = new Map([[1, "Easy"], [2, "Medium"], [3, "Hard"]]);
let turn = true;   //todo true human, false AI
let difficulty = 1; //todo 0 random 1 smarter 2 the smartest
let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];




window.onload = function (){
    let htmlAllSquares = document.querySelectorAll(".square");
    let htmlDifficulty = document.querySelector("#difficultMessage");
    document.querySelector("#welcomeMessage").innerHTML = "<p>" + localStorage.nick + " Let's play !</p>";
    htmlDifficulty.innerHTML = "<p>Difficulty: " + difficultMap.get(difficulty) + "</p>";

    document.querySelector("#btc-increase").addEventListener("click", function () {
        increaseDifficulty(htmlDifficulty);
    });
    document.querySelector("#btc-decrease").addEventListener("click", function () {
        decreaseDifficulty(htmlDifficulty);
    });
    document.querySelector("#btnReset").addEventListener("click", function (event) {
        refreshHtmlBoard(htmlAllSquares)
    });


    //todo mark X
    for (let i = 0; i < htmlAllSquares.length; i++) {
        htmlAllSquares[i].onclick = function(){
            if (turn && htmlAllSquares[i].querySelector("p").innerHTML !== "O") {
                htmlAllSquares[i].querySelector("p").innerHTML = "X";
            }
            console.log(htmlAllSquares[i].getAttribute("value"));
        }
    }
};


function refreshHtmlBoard(htmlSquares) {
    let z = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            console.log(board[y][x]);
            htmlSquares[z++].querySelector("p").innerHTML = board[y][x];
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