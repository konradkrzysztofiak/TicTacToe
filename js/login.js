window.onload = function () {
    let btnLogin = document.querySelector(".login-btn");
    let nick = document.querySelector("#nick");
    btnLogin.addEventListener('click', function () {
        localStorage.nick = nick.value;
    });
};

