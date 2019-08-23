


window.onload = function () {
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










    // //todo how we should storage our's all players
    // let players = [
    //     {playerName: "Adam0", score: 6666},
    //     {playerName: "Adam1", score: 3},
    //     {playerName: "Adam666", score: 4},
    //     {playerName: "Adam3", score: 2},
    //     {playerName: "Adam4", score: 1}
    // ];
    // function compare(a, b) {
    //     return b.score - a.score;
    // }
    // players.sort(compare);
    // localStorage.players = JSON.stringify(players);
    // //todo how we get players and theirs score from local store
    // let playersFromLocalStorage = JSON.parse(localStorage.players);
    // for (let i = 0; i < playersFromLocalStorage.length; i++) {
    //     console.log(playersFromLocalStorage[i].playerName + " " + playersFromLocalStorage[i].score);
    // }
    // console.log("-------------------------------------------------------------------");
};