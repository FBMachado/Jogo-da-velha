const casas = document.querySelectorAll('.casa');
const placarJogador1 = document.getElementById('jogador1-placar');
const placarJogador2 = document.getElementById('jogador2-placar');
const botaoReset = document.getElementById('reset');
const botaoModoAlternativo = document.getElementById('modo-alternativo');

let jogadorAtual = 'X';
let jogoAtivo = true;
let jogadas = ['', '', '', '', '', '', '', '', ''];
let pontosJogador1 = 0;
let pontosJogador2 = 0;
let modoAlternativo = false;

const combinacoesVencedoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

function verificarVencedor() {
    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (jogadas[a] && jogadas[a] === jogadas[b] && jogadas[a] === jogadas[c]) {
            jogoAtivo = false;
            if (jogadas[a] === 'X') {
                pontosJogador1++;
                placarJogador1.textContent = pontosJogador1;
            } else {
                pontosJogador2++;
                placarJogador2.textContent = pontosJogador2;
            }
            alert(`Jogador ${jogadas[a]} venceu!`);
            return;
        }
    }

    if (!jogadas.includes('')) {
        jogoAtivo = false;
        alert('Empate!');
    }
}

function reiniciarJogo() {
    jogadorAtual = 'X';
    jogoAtivo = true;
    jogadas = ['', '', '', '', '', '', '', '', ''];
    casas.forEach(casa => {
        casa.textContent = '';
        casa.classList.remove('x', 'o');
    });
}

function alternarModoJogo() {
    modoAlternativo = !modoAlternativo;
    alert(`Modo Alternativo ${modoAlternativo ? 'ativado' : 'desativado'}!`);
}

casas.forEach((casa, index) => {
    casa.addEventListener('click', () => {
        if (!jogoAtivo || jogadas[index]) return;

        jogadas[index] = jogadorAtual;
        casa.textContent = jogadorAtual;
        casa.classList.add(jogadorAtual.toLowerCase());
        verificarVencedor();
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';

        if (modoAlternativo) {
            // Lógica adicional para o modo alternativo
        }
    });
});

botaoReset.addEventListener('click', reiniciarJogo);
botaoModoAlternativo.addEventListener('click', alternarModoJogo);
