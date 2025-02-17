function startCountdown() {
    countdownInProgress = true;
    for (let i = 0; i < countdownText.length; i++) {
        setTimeout(function () {
            countdownEl.textContent =  countdownText[i];
            countdownEl.style.color = countdownColors[i];
            countdownEl.style.fontSize = (i*2  + 1.5) + "vw";
        }, i * countdownInterval);
    }
    setTimeout(function () {
        countdownDone = true;
        countdownInProgress = false;
        countdownEl.style.color = "white";
        countdownEl.textContent = "";
        startGame();
    }, countdownText.length * countdownInterval);
}