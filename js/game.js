let countdownText = ["3", "2", "1", "LOS"],
    countdownColors = ["white", "yellow", "orange", "red"], countdownInterval = 500, countdownInProgress = false;
    gameOver = false, onGround = true, gameStarted = false, countdownDone = false,
    speedMin = 15, speedMax = 35, score = 0, enemyPos = 0, enemySpeed = 0, bgSpeed = 3,
    highscore = localStorage.getItem("highscore") ? +localStorage.getItem("highscore") : 0; 

const enemyEl = getEl("enemyCharacter"),
    playerEl = getEl("playerCharacter"),
    startMenuEl = getEl("startMenu"),
    bgEl = getEl("gameBackground"),
    scoreEl = getEl("currentScoreDisplay"),
    highscoreEl = getEl("highscoreDisplay"),
    countdownEl = getEl("startMenuContent"),
    playerXPos = +getComputedStyle(document.documentElement).getPropertyValue("--player-xpos"), //+ entspricht parseInt()
    sfx_jump = new Audio("sfx/jump.mp3"),
    sfx_dead = new Audio("sfx/death.mp3"),
    sfx_music = new Audio("sfx/music_p.mp3");

sfx_music.loop = true;

function getEl(id) {
    return document.getElementById(id);
}

document.addEventListener("keydown", function (event) {
    let code = event.code;
    if (code === "F4") {
        resetHighscore();
    } else if ((code === "Space" || code === "KeyW" || code === "ArrowUp") && (countdownInProgress === false)) {
        if (gameStarted) {
            jump();
        } else if (!countdownDone) {
             startCountdown();
        } else {
            startGame();
        }
    }
});

function startCountdown() {
    countdownDone = true;
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
        startGame();
    }, countdownText.length * countdownInterval);
}

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
    const noNewHighscoreMessage = `Du hast über 8 Millarden Menschen auf dem gewissen!<br><br>Um es nochmals zu versuchen, drücke die <span style="color: orange;">Leertaste</span>.`;
    let newHighscoreMessage = `Du hast zwar über 8 Millarden Menschen auf dem gewissen,<br><br>aber zumindest hast du einen NEUEN HIGHSCORE von ${score} aufgestellt!.<br><br>Um es nochmals zu versuchen, drücke die <span style="color: orange;">Leertaste</span>.`;
    countdownEl.innerHTML = score > highscore ? newHighscoreMessage : noNewHighscoreMessage;
    sfx_music.pause();
    sfx_music.currentTime = 0;
    sfx_dead.play();
    playerEl.style.backgroundImage = "var(--player-collision)";
    enemyEl.style.backgroundImage = "var(--enemy-collision)";
    gameOver = true;
    saveHighscore();
    setTimeout(function () {
        startMenuEl.style.display = "flex";
        updateScores();
        gameStarted = false;
        countdownDone = false;
    }, 1000);
}

function randSpeed(min, max) {
    return Math.random() * (max - min) + min;
}
