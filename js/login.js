window.onload = function () {
    let btnLogin = document.querySelector(".login-btn");
    let nick = document.querySelector("#nick");
    let newGame = document.querySelector("#newGame");
    btnLogin.addEventListener('click', function () {
        console.log("test  " + nick.value);
        localStorage.nick = nick.value;
        console.log(localStorage.nick);
        // passNick(nick);
    });
    newGame.addEventListener('click', function () {
        if (document.getElementById("createNewGame").style.display === "none"){
            document.getElementById("createNewGame").style.display = "block";
        } else {
            document.getElementById("createNewGame").style.display = "none"
        }

    })
};

// function passNick(nick) {
//     if (/^[A-Za-z0-9]{1,10}$/.test(nick.value)) {
//         localStorage.nick = nick.value;
//     }
// }
