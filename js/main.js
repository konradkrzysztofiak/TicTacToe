let board = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
];
let turn = false;   //todo true human, false AI


document.onload = function () {

    console.log("ttteeesssttt");
    console.log("Runnnnnn <--------");
    let square = document.querySelectorAll(".square");
    console.log(square[0]);
    // refreshBoard(board);
    for (let i = 0; i < square.length; i++) {
        square[i].onclick = function(){
            square[i].querySelector("p").innerHTML = "X";
            console.log(square[i].getAttribute("value"));
        }
    }
};

document.onload();

function refreshBoard(inBoard) {
    let z = 0;
    console.log(square.length);
    console.log(square[0] + " <---->");
    for (let y = 0; y < square.length; y++) {
        for (let x = 0; x < 3; x++) {
            console.log(inBoard[y][x]);
            square[z++].querySelector("p").innerHTML = inBoard[y][x++];
        }
        // square[y].querySelector("p").innerHTML = inBoard[y][x++];
        // square[y].querySelector("p").innerHTML = inBoard[y][x++];
        // x = 0;
        // square[i].onclick = function(){
        //     square[i].querySelector("p").innerHTML = "X";
        //     console.log(square[i].getAttribute("value"));
        // }
    }

}

