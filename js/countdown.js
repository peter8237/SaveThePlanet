function startCountdown() {
    highscoresEl.style.display = "none";
    countdownEl.style.display = "none";
    countdownInProgress = true;
    setTimeout(() => {
        countdownEl.style.display = "flex"; // flackern fix
    }, countdownInterval);
    countdownText.forEach((text, index) => {
        setTimeout(() => {
            countdownEl.textContent = text;
            countdownEl.style.color = countdownColors[index];
            countdownEl.style.fontSize = (index * 2 + 1.5) + "vw";
        }, index * countdownInterval);
    });
    setTimeout(() => {
        countdownDone = true;
        countdownInProgress = false;
        countdownEl.style.color = "white";
        countdownEl.textContent = "";
        startGame();
    }, countdownText.length * countdownInterval);
}