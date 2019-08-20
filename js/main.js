window.onload = function (){
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    let turn = false;   //todo true human, false AI
    let allHtmlSquares = document.querySelectorAll(".square");
    document.querySelector("#btnReset").addEventListener("click", function (event) {
        refreshBoard(board, allHtmlSquares)

    });

    for (let i = 0; i < allHtmlSquares.length; i++) {
        allHtmlSquares[i].onclick = function(){
            allHtmlSquares[i].querySelector("p").innerHTML = "X";
            console.log(allHtmlSquares[i].getAttribute("value"));
        }
    }
};


function refreshBoard(inBoard, htmlSquares) {
    console.log("refreshBoard");
    let z = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            console.log(inBoard[y][x]);
            htmlSquares[z++].querySelector("p").innerHTML = inBoard[y][x];
        }
    }
}

