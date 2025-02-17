document.addEventListener("keydown", function (event) {
    let code = event.code;
    if (code === "F4") {
        resetHighscore();
    } else if ((code === "Space" || code === "KeyW" || code === "ArrowUp") && (countdownInProgress === false)&& (newHighscoreInput === false)) {
        if (gameStarted) {
            jump();
        } else if (!countdownDone) {
            startCountdown();
        } else {
            startGame();
        }
    } else if ((code === "Enter" || code === "NumpadEnter") && (newHighscoreInput === true)) {
            saveHighscorePlayerName();
            newHighscoreInput = false;
    }
});

function startGame() {
    sfx_music.play();
    gameStarted = true;
    gameOver = false;
    score = 0;
    enemyPos = window.innerWidth;
    enemySpeed = randSpeed(speedMin, speedMax);
    startMenuEl.style.display = "none";
    countdownEl.style.fontSize = "1.5vw";
    playerEl.style.backgroundImage = "var(--player-ground)";
    enemyEl.style.backgroundImage = "var(--enemy)";
    updateScores();
    moveBg();
    moveEnemy();
}

function jump() {
    if (gameOver || !onGround) return;
    sfx_jump.play();
    playerEl.classList.add("jump");
    playerEl.style.backgroundImage = "var(--player-jump)";
    onGround = false;
    setTimeout(function () {
        playerEl.classList.remove("jump");
        playerEl.style.backgroundImage = "var(--player-ground)";
        onGround = true;
    }, 600);
}

function moveEnemy() {
    if (gameOver) return;
    if (enemyPos < 900 + playerXPos && onGround) {
        playerEl.style.backgroundImage = "var(--player-alert)";
        enemyEl.style.backgroundImage = "var(--enemy-alert)";
    }
    enemyEl.style.left = (enemyPos -= enemySpeed) + "px";
    if (enemyPos < 120 + playerXPos && onGround) {
        handleGameOver();
    } else if (enemyPos < 0) {
        enemyPos = window.innerWidth;
        score++;
        updateScores();
        enemyEl.style.backgroundImage = "var(--enemy)";
        enemySpeed = randSpeed(speedMin, speedMax);
    }
    requestAnimationFrame(moveEnemy);
}

function handleGameOver() {
    let newHighscoreMessage =
    `<span id="inputPrompt1">Du hast zwar über 8 Millarden Menschen auf dem Gewissen,<br><br>
    aber zumindest hast du einen neuen highscore von ${score} aufgestellt!<br><br>
    Verewige dich in den Trümmern zu und bestätige mit <span style="color: red;">Enter</span>.</span><br><br>
    <span id="inputPrompt2" style="display: none">Um es nochmals zu versuchen, drücke die <span style="color: orange;">Leertaste</span>.</span>`;
    const noNewHighscoreMessage = 
    `<span>Du hast über 8 Millarden Menschen auf dem Gewissen!<br><br>
    Um es nochmals zu versuchen, drücke die <span style="color: orange;">Leertaste</span></span>.`;
    sfx_music.pause();
    sfx_music.currentTime = 0;
    sfx_dead.play();
    playerEl.style.backgroundImage = "var(--player-collision)";
    enemyEl.style.backgroundImage = "var(--enemy-collision)";
    gameOver = true;

    if (score > highscore) {
        countdownEl.innerHTML = newHighscoreMessage;
        inputFieldEl.style.display = "block";
        inputFieldEl.value = "";
        saveHighscore();
        setTimeout(function () {
            startMenuEl.style.display = "flex";
            updateScores();
            gameStarted = false;
            countdownDone = false;
            inputFieldEl.focus();
        }, 1000);
    newHighscoreInput = true; 
    } else {
        newHighscoreInput = false;
        startMenuEl.style.display = "flex";
        countdownEl.innerHTML = noNewHighscoreMessage;
        gameStarted = false;
        countdownDone = false;
        inputFieldEl.style.display = "none";
    }
}
