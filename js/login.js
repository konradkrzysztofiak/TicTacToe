window.onload = function () {
    let btnLogin = document.querySelector(".login-btn");
    let nick = document.querySelector("#nick");
    let newGame = document.querySelector("#newGame");
    let createNewGameBtn = document.getElementById("createNewGame");
    let top10Btn = document.getElementById("top10btn");
    let top10Area = document.getElementById("top10");
    let howToPlayBtn = document.getElementById("howToPlayBtn");
    let howToPlayArea = document.getElementById("howToPlay");
    let creditsBtn = document.getElementById("creditsBtn");
    let creditsArea = document.getElementById("credits");

    let htmlTable = document.querySelector("#tableTop10");
    let htmlTableTr = document.createElement("tr");
    let htmlTableThName = document.createElement("th");
    let htmlTableThPints = document.createElement("th");
    // htmlTableThName.innerText = "ja";
    // htmlTableThPints.innerText = 100;
    // htmlTableTr.append(htmlTableThName, htmlTableThPints);
    // htmlTable.appendChild(htmlTableTr);

    //todo how we get players and theirs score from local store
    let playersFromLocalStorage = JSON.parse(localStorage.players);
    for (let i = 0; i < playersFromLocalStorage.length; i++) {
        let htmlTableTr = document.createElement("tr");
        let htmlTableThName = document.createElement("th");
        let htmlTableThPints = document.createElement("th");
        htmlTableThName.innerText = playersFromLocalStorage[i].playerName;
        htmlTableThPints.innerText = playersFromLocalStorage[i].score;
        htmlTableTr.append(htmlTableThName, htmlTableThPints);
        htmlTable.appendChild(htmlTableTr);
        console.log(playersFromLocalStorage[i].playerName + " " + playersFromLocalStorage[i].score);
    }


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

    top10Btn.addEventListener('click', function () {
        showHide(top10Area);
    });

    howToPlayBtn.addEventListener('click', function () {
        showHide(howToPlayArea);
    });
    creditsBtn.addEventListener('click', function () {
        showHide(creditsArea);
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
