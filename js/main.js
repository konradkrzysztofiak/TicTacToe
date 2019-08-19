window.onload = function () {
    let square = document.querySelectorAll(".square");
    console.log(square[0]);
    for (let i = 0; i < square.length; i++) {
        square[i].onclick = function(){
            alert("asdgasg");
        }
    }
}

