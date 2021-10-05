let order = [];
let clickedOrder = [];
let score = 0;
let context,
    oscillator,
    contextGain,
    type = "triangle",
    frequency;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

// Função de início de jogo
const playGame = () => {
    alert("Bem vindo ao Genesis!\nIniciando novo jogo!");
    score = 0;
    nextLevel();
};

// Função que retorna a cor
const createColorElement = (color) => {
    switch (color) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
        default:
            return null;
    }
};

// Função que pega a frequencia de som do botão
const getFrequencyNote = (color) => {
    switch (color) {
        case 0:
            return 164.81;
        case 1:
            return 440;
        case 2:
            return 277.18;
        case 3:
            return 329.62;
        default:
            return null;
    }
};

//Cria ordem aleatória de cores.
const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];
    for (let i in order) {
        const elementColor = createColorElement(order[i]);
        setTimeout(() => {
            lightColor(elementColor);
        }, i + 1 * 200);
    }
};

//Acende a próxima cor
const lightColor = (element) => {
    setTimeout(() => {
        element.classList.add("selected");
    }, 0);
    setTimeout(() => {
        element.classList.remove("selected");
    }, 300);
};

// Função para próximo nível do jogo
const nextLevel = () => {
    score++;
    shuffleOrder();
};

// Função para Game Over
const gameOver = () => {
    alert(
        `Pontuação final: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`
    );
    order = [];
    clickedOrder = [];

    playGame();
};

// Checa se os botões clicados são os mesmos da ordem gerada no jogo.
const checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }

    if (clickedOrder.length === order.length) {
        setTimeout(() => {
            alert(
                `Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`
            );
            nextLevel();
        }, 250);
    }
};

//Função para o click do usuário
const click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add("selected");
    setTimeout(() => {
        createColorElement(color).classList.remove("selected");
    }, 200);
    checkOrder();
};

// Eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// Início do jogo
playGame();

// Funções do AudioContext
function start() {
    context = new AudioContext();
    oscillator = context.createOscillator();
    contextGain = context.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    oscillator.connect(contextGain);
    contextGain.connect(context.destination);
    oscillator.start(0);
}

function stop() {
    start();
    contextGain.gain.exponentialRampToValueAtTime(
        0.00001,
        context.currentTime + 0.7
    );
}

// Eventos de áudio
green.addEventListener("click", function () {
    frequency = getFrequencyNote(0);
    stop();
});

red.addEventListener("click", function () {
    frequency = getFrequencyNote(1);
    stop();
});

yellow.addEventListener("click", function () {
    frequency = getFrequencyNote(2);
    stop();
});

blue.addEventListener("click", function () {
    frequency = getFrequencyNote(3);
    stop();
});
