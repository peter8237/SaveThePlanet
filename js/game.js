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
    speedMin = 10;
    speedMax = 15;
    bgSpeed = 1;
    enemyEl.style.bottom = "var(--enemy-ypos)";
    enemyEl.style.width = "256px";
    enemyEl.style.height = "128px";
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
    if (gameOver || !onGround || (score === fuckYou)) return;
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
    if (enemyPos < 120 + playerXPos && onGround){
        handleGameOver();
    } else if (enemyPos < 0 - 128) {
        enemyPos = window.innerWidth;
        score++;
        levelUp();
        updateScores();
        enemyEl.style.backgroundImage = "var(--enemy)";
        enemySpeed = randSpeed(speedMin, speedMax);
    }if(score === fuckYou){
        enemySpeed = 10;
    }
    enemyEl.style.left = (enemyPos -= enemySpeed) + "px";
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
            playerEl.style.backgroundImage = "var(--player-collision)";

        }, 1000);
    playerEl.style.backgroundImage = "var(--player-collision)";
    newHighscoreInput = true; 
    } else {
        newHighscoreInput = false;
        startMenuEl.style.display = "flex";
        countdownEl.innerHTML = noNewHighscoreMessage;
        gameStarted = false;
        countdownDone = false;
        inputFieldEl.style.display = "none";
        playerEl.style.backgroundImage = "var(--player-collision)";
    }
}

function levelUp(){
        levelEl.textContent = "Level: " + score;
        speedMin+=2;
        speedMax++;
        bgSpeed++;
    if (score === fuckYou){
        level = "Fuck You";
        levelEl.textContent = "Level: " + level;
        enemyEl.style.bottom = "var(--enemy-yposFU)";
        enemyEl.style.width = "768px";
        enemyEl.style.height = "384px";
        enemyEl.style.backgroundSize = 'cover';
        if (enemyPos < 128 + playerXPos) {
            handleGameOver();
        }
    }
}
