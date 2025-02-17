function saveHighscorePlayerName() {
    if (inputFieldEl.value.trim()) {
        highscorePlayerName = inputFieldEl.value.trim();
        localStorage.setItem("highscorePlayerName", highscorePlayerName);
        localStorage.setItem("highscore", score);
        highscore = score;
        document.getElementById("inputPrompt1").style.display = "none";
        document.getElementById("inputPrompt2").style.display = "block";
        inputFieldEl.style.display = "none";
        updateScores();
    }
}

function updateScores() {
    bestName = localStorage.getItem("highscorePlayerName");
    scoreEl.textContent = "Score: " + score;
    if (!bestName) {
        highscoreEl.textContent = "Highscore: " + highscore;
    } else {
        highscoreEl.textContent = "Highscore: " + highscore + " von " + bestName;
    }
}

function saveHighscore() {
    highscore = score;
    localStorage.setItem("highscore", highscore);
    updateScores();
}

function resetHighscore() {
    highscore = 0;
    highscorePlayerName = "";
    localStorage.removeItem("highscore");
    localStorage.removeItem("highscorePlayerName");
    updateScores();
}