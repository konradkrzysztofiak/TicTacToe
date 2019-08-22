window.onload = function () {
    let btnLogin = document.querySelector(".login-btn");
    let nick = document.querySelector("#nick");
    let newGame = document.querySelector("#newGame");
    btnLogin.addEventListener('click', function () {
        console.log("test  " + nick.value);
        localStorage.nick = nick.value;
        console.log(localStorage.nick);
        // passNick(nick);;
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
        console.log(document.getElementById("createNewGame").style.display);
        if (document.getElementById("createNewGame").style.display === "none" ||
            document.getElementById("createNewGame").style.display === "") {
            document.getElementById("createNewGame").style.display = "block";
        } else {
            document.getElementById("createNewGame").style.display = "none"
        }

    });

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


// function passNick(nick) {
//     if (/^[A-Za-z0-9]{1,10}$/.test(nick.value)) {
//         localStorage.nick = nick.value;
//     }
// }
