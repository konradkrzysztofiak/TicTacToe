let square = document.querySelectorAll(".square");
window.onload = function () {
    // console.log(square[0]);
    for (let i = 0; i < square.length; i++) {
        square[i].onclick = function(){
            console.log(square[i]);
            square[i].querySelector("p").innerHTML = "X";
            console.log(square[i].tagName)
            // alert("asdgasg");
        }
    }
};



