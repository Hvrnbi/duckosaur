// The player
const ducko = document.querySelector("#ducko-div");

// The score
const score = document.querySelector("#score-div");

// The text
const text_div = document.querySelector("#text-div");

// The game div
const game = document.querySelector("#game-div");

window.spawn_interval;
window.move_interval;
let started = false;
let first_start = true;

// Jump
function jump() {
    if (! ducko.classList.contains("jumping")) {
        ducko.classList.add("jumping");
        setTimeout(function() {
            ducko.classList.remove("jumping");
        }, 900);

        // To check if the player is high enough to dodge the cactus
        setTimeout(function () {
            ducko.classList.add("safe");
            setTimeout( function() {
                ducko.classList.remove("safe");
            }, 580);
        }, 140);
    }
}

document.body.addEventListener("keypress", key_pressed);
document.body.addEventListener("click", key_pressed);
document.body.addEventListener("touchstart", key_pressed);
text_div.addEventListener("click", reset);
text_div.addEventListener("touchstart", reset);

// Spawn a cactus
function cactusSpawn() {
    let cactus = document.createElement("div");
    cactus.classList.add("cactus");
    cactus.style.right = "0vw";
    game.appendChild(cactus);
}

// Move all cactus
function cactusMove() {
    var all_cactus = document.querySelectorAll(".cactus");
    all_cactus.forEach(cactus => {
        let right = parseInt(cactus.style.right.slice(0, -2));
        if (right <= 99) {
            cactus.style.right = right + 1 + "vw";
            if ((! ducko.classList.contains("safe")) && 85 <= right && right <= 94) {
                clearInterval(window.move_interval);
                clearInterval(window.spawn_interval);
                text_div.innerHTML = "Your score : " + (parseInt(score.textContent) + 1) + "<br>Click here to restart";
                started = false;
            };
        } else {
            cactus.classList.remove("cactus");
        }
    });
    score.textContent = parseInt(score.textContent) + 1;
}

function cactusRandom() {
    let x = Math.random();
    if (x < 0.5) {
        cactusSpawn();
    }
}

function start() {
    window.spawn_interval = setInterval(cactusRandom, 1200);
    window.move_interval = setInterval(cactusMove, 40);
    started = true;
    first_start = false;
    text_div.innerHTML = "";
}

function reset() {
    if (!started && !first_start) {
        started = true;
        var all_cactus = document.querySelectorAll(".cactus");
        all_cactus.forEach(cactus => {
            cactus.classList.remove("cactus");
        });
        text_div.innerHTML = "";
        score.textContent = 0;
        window.spawn_interval = setInterval(cactusRandom, 1200);
        window.move_interval = setInterval(cactusMove, 40);
    }
}

function key_pressed() {
    if (started) {
        jump();
    } else if (first_start) {
        start();
    }
}
