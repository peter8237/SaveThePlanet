function updateScores() {
    scoreEl.textContent = "Score: " + score;
    highscoreEl.textContent = "Highscore: " + highscore;
}

function saveHighscore() {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
        updateScores();
    }
}

function resetHighscore() {
    highscore = 0;
    localStorage.removeItem("highscore");
    updateScores();
}
