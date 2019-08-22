window.onload = function () {
    let btnLogin = document.querySelector(".login-btn");
    let nick = document.querySelector("#nick");
    let newGame = document.querySelector("#newGame");
    let createNewGameBtn = document.getElementById("createNewGame");

    btnLogin.addEventListener('click', function () {
        localStorage.nick = nick.value;
    });

    document.getElementById('difficulty').onclick = function () {
        let value = getRadioValue(this, 'difficulty');
        localStorage.difficulty = value;
    };

    document.getElementById('difficulty').onsubmit = function () {
        let value = getRadioValue(this, 'sign');
        localStorage.sign = value;
    };

    newGame.addEventListener('click', function () {
        showHide(createNewGameBtn);
    });

    function showHide(divId) {
        if (divId.style.display === "none" ||
            divId.style.display === "") {
            divId.style.display = "block";
        } else {
            divId.style.display = "none";
        }

    }

    function getRadioValue(form, name) {
        let value;
        let radios = form.elements[name];

        for (let i = 0, len = radios.length; i < len; i++) {
            if (radios[i].checked) {
                value = radios[i].value;
                break;
            }
        }
        return value;
    }


};
