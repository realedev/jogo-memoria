const emojis = [
    "🦧", "🦧",
    "🐣", "🐣",
    "🐸", "🐸",
    "🐉", "🐉",
    "🐍", "🐍",
    "🦥", "🦥",
    "🐘", "🐘",
    "🐐", "🐐"
];

let openCards = [];
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
let vidas = 10;
let tempo = 30;
document.getElementById("vidas").textContent = vidas;
document.getElementById("tempo").textContent = tempo;

let intervalId = setInterval(function() {
    tempo--;
    document.getElementById("tempo").textContent = tempo;
    gameOver();
}, 1000);

function gameOver() {
    if (tempo <= 0 || vidas <= 0) {
        alert("GAME OVER!");
        clearInterval(intervalId);
        window.location.reload();
    }
}

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (this.classList.contains("boxOpen") || this.classList.contains("boxMatch")) {
        return;}
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        vidas--;
        document.getElementById("vidas").textContent = vidas;
        gameOver();
    }
    openCards = [];
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Você venceu!");
    }
}
