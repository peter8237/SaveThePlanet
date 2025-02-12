const enemyEl = getEl("enemyCharacter"),
playerEl = getEl("playerCharacter"),
startMenuEl = getEl("startMenu"),
bgEl = getEl("gameBackground"),
scoreEl = getEl("currentScoreDisplay"),
highscoreEl = getEl("highscoreDisplay"),
playerVPos = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--player-xpos")),
sfx_jump = new Audio("sfx/jump.mp3"),
sfx_dead = new Audio("sfx/death.mp3"),
sfx_music = new Audio("sfx/music_p.mp3");

let speedMin = 15, speedMax = 39, bgSpeed = 3, score = 0, gameOver = false, onGround = true, gameStarted = false,
highscore = localStorage.getItem("highscore") ? +localStorage.getItem("highscore") : 0; 

sfx_music.loop = true;

function getEl(id) {
    return document.getElementById(id);
}

document.addEventListener("keydown", function (event) {
    var code = event.code;
    if (code === "F4") {
        resetHighscore();
    } else if (code === "Space" || code === "KeyW" || code === "ArrowUp") {
        if (gameStarted) {
            jump();
        } else {
            startGame();
        }
    }
});

function startGame() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    enemyPos = window.innerWidth;
    enemySpeed = randSpeed(speedMin, speedMax);
    startMenuEl.style.display = "none";
    playerEl.style.backgroundImage = "var(--player-ground)";
    enemyEl.style.backgroundImage = "var(--enemy)";
    updateScores();
    moveBg();
    moveEnemy();
    sfx_music.play();
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
    enemyEl.style.left = (enemyPos -= enemySpeed) + "px";
    if (enemyPos < 120 + playerVPos && onGround) {
        handleGameOver();
    } else if (enemyPos < 0) {
        enemyPos = window.innerWidth;
        score++;
        updateScores();
        enemySpeed = randSpeed(speedMin, speedMax);
    }
    requestAnimationFrame(moveEnemy);
}

function handleGameOver() {
    sfx_music.pause();
    sfx_music.currentTime = 0;
    sfx_dead.play();
    playerEl.style.backgroundImage = "var(--player-collision)";
    enemyEl.style.backgroundImage = "var(--enemy-collision)";
    gameOver = true;
    saveHighscore();
    setTimeout(function () {
        startMenuEl.style.display = "block";
        updateScores();
        gameStarted = false;
    }, 1000);
}

function randSpeed(min, max) {
    return Math.random() * (max - min) + min;
}
