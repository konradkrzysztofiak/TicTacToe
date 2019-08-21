window.onload = function () {
    let btnLogin = document.querySelector(".login-btn");
    let nick = document.querySelector("#nick");
    btnLogin.addEventListener('click', function () {
        console.log("test  " + nick.value);
        localStorage.nick = nick.value;
        console.log(localStorage.nick);
        // passNick(nick);
    });
};

