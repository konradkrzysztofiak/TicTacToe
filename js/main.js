let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];
let turn = false;   //todo true human, false AI
let square = document.querySelectorAll(".square");


window.onload = function () {
    for (let i = 0; i < square.length; i++) {
        square[i].onclick = function(){
            square[i].querySelector("p").innerHTML = "X";
            console.log(square[i].getAttribute("value"));
        }
    }
};

function refreshBoard() {

}

