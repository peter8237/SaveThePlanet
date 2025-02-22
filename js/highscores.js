function saveHighscorePlayerName() {
    const highscorePlayerName = inputFieldEl.value.trim();
    if (highscorePlayerName) {
        addHighscore(highscorePlayerName, score);
        highscoresEl.style.display = "block";
        document.getElementById("inputPrompt1").style.display = "none";
        document.getElementById("inputPrompt2").style.display = "block";
        inputFieldEl.style.display = "none";
    }
}

function updateScores() {
    scoreEl.textContent = "Score: " + score;
}

function loadHighscores() {
    return JSON.parse(localStorage.getItem("highscores")) || [];
}

function saveHighscores(highscores) {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function addHighscore(name, score) {
    let highscores = loadHighscores();
    const newEntry = { name, score, date: Date.now() };
    highscores.push(newEntry);
    highscores.sort((a, b) => b.score - a.score || a.date - b.date); // major lazer
    if (highscores.length > maxTopEntries) {
        highscores.pop();
    }
    saveHighscores(highscores);
    updateHighscoreDisplay();
}

function deleteLastHighscore() {
    let highscores = loadHighscores();
    if (highscores.length > 0) {
        highscores.pop();
        saveHighscores(highscores);
        updateHighscoreDisplay();
    }
}

function updateHighscoreDisplay() {
    const highscores = loadHighscores();
    highscoresEl.innerHTML = "";
    while (highscores.length < maxTopEntries) { // ggf die highscores mit platzhaltern auffüllen 
        highscores.push({ name: noEntryYet, score: 0 });
    }
    highscores.forEach((entry, index) => {  // highscores auslesen und in div highscores anfügen
        const div = document.createElement("div");
        div.classList.add("highscore-entry");
        div.innerHTML = `<div class='rank'>${index + 1}.</div>
                            <div class='name'>${entry.name}</div>
                            <div class='score'>${entry.score}</div>`;
        highscoresEl.appendChild(div);
    });
}

function isNewHighscore(score) {
    const highscores = loadHighscores();
    if (score > 0) {    // ist überhaupt ein punkt erzielt worden?
        if (highscores.length < maxTopEntries) { // ist noch platz in der liste?
            return true;
        } else if (score > highscores[highscores.length - 1].score) { // besser als letzt­plat­zierte
            return true;
        }
    }

    return false;
}