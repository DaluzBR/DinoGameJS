const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let dinoPosition = 0;
let score = 0;

function handleKeyUp(event) {
    // Se tecla de espaço for pressionada.
    if (event.keyCode === 32 && !isJumping) {
        dinoJump();
    }
}

function dinoJump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (dinoPosition >= 200) {
            // Para subida.
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (dinoPosition <= 20) {
                    // Para descida.
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    // Descendo.
                    dinoPosition -= 20;
                    dino.style.bottom = dinoPosition + 'px';
                }
            }, 20);
        } else {
            // Subindo.
            dinoPosition += 20;
            dino.style.bottom = dinoPosition + 'px';
        }
    }, 20);
}

// Cria um cacto na tela.
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1200;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 2000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            updateScore();
        } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) {
            clearInterval(leftInterval);
            gameOver();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    // Executa uma função depois de um determinado tempo.
    // Executa a função createCactus() um tempo aleatório depois recursivamente.
    setTimeout(createCactus, randomTime);
}

// Atualiza o score
function updateScore() {
    score += 10;
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = `Score: ${score} pts`;
    
}

function gameOver() {
    document.body.innerHTML = `<h1 class="game-over">Fim de jogo</h1>
    <h1 class="game-score">Score: ${score} pts</h1>
    <h1 class="game-repeat">Pressione [F5] para jogar novamente!</h1>`;
}

createCactus();
document.addEventListener('keydown', handleKeyUp);