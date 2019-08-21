window.onload = function () {
    let btnLogin = document.querySelector(".login-btn");
    let nick = document.querySelector("#nick");
    btnLogin.addEventListener('click', function () {
        if (/^[A-Za-z0-9]{1,10}$/.test(nick.value)) {
            console.log(nick.value);
            console.log("pass");
            localStorage.nick = nick.value;
            // window.location.href = "index.html";
        }
        console.log(nick.value);

        // console.log(document.querySelector("#nick"));
        // loadGame(nick);

    });
    return false;
    // console.log("test");
};

// function loadGame() {
//     // console.log("click");
//     // console.log(nick);
// }
