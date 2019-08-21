window.onload = function (){
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    let turn = true;   //todo true human, false AI
    let allHtmlSquares = document.querySelectorAll(".square");
    document.querySelector("#btnReset").addEventListener("click", function (event) {
        refreshHtmlBoard(board, allHtmlSquares)
    });
    let welcomeMessage = document.querySelector("#welcomeMessage").innerHTML = "<p>" + localStorage.nick + " Let's play !</p>";


    for (let i = 0; i < allHtmlSquares.length; i++) {
        allHtmlSquares[i].onclick = function(){
            if (turn && allHtmlSquares[i].querySelector("p").innerHTML !== "O") {
                allHtmlSquares[i].querySelector("p").innerHTML = "X";
            }
        }
    }
};


function refreshHtmlBoard(inBoard, htmlSquares) {
    let z = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            htmlSquares[z++].querySelector("p").innerHTML = inBoard[y][x];
        }
    }
}
