// Perguntas do jogo
const questions = [
  { q: 'Qual é a fórmula do volume do cone?', opts: ['V = πr²h', 'V = 1/3 πr²h', 'V = πrg'], a: 1 },
  { q: 'O cone tem base de formato...', opts: ['Quadrado', 'Circular', 'Hexagonal'], a: 1 },
  { q: 'A linha inclinada do cone é chamada de...', opts: ['Geratriz', 'Diâmetro', 'Altura'], a: 0 },
  { q: 'Qual é a área lateral do cone?', opts: ['πrg', '2πr²', 'πr(g + r)'], a: 0 },
  { q: 'O volume do cone é igual a...', opts: ['metade do cilindro', 'um terço do cilindro', 'igual ao cilindro'], a: 1 },
  { q: 'A geratriz, altura e raio formam...', opts: ['Um triângulo retângulo', 'Um quadrado', 'Uma circunferência'], a: 0 }
];

let step = 0;
let score = 0;

function loadQuestion() {
  const q = questions[step];
  document.getElementById('question').innerText = q.q;

  const optDiv = document.getElementById('options');
  optDiv.innerHTML = '';

  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(btn, i);
    optDiv.appendChild(btn);
  });

  document.getElementById('progress').innerText = `Pergunta ${step + 1} de ${questions.length}`;
}

function handleAnswer(button, index) {
  const buttons = document.querySelectorAll('#options button');
  buttons.forEach(btn => btn.classList.add('disabled'));

  if (index === questions[step].a) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
    buttons[questions[step].a].classList.add('correct');
  }

  setTimeout(() => {
    if (step < questions.length - 1) {
      step++;
      loadQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  let finalMessage = '';
  if(score <= 4){
    finalMessage = 'Seu lixo! Não serve nem pra jogar no Vasco!';
  } else if(score === 5){
    finalMessage = 'Mandou bem, mas ainda dá pra melhorar!';
  } else if(score === 6){
    finalMessage = 'Você é o Rei dos Cones! Ninguém te supera!';
  }

  document.querySelector('.quiz-container').innerHTML = `
    <h2>Fim do jogo!</h2>
    <p>Você acertou ${score} de ${questions.length}!</p>
    <p><strong>${finalMessage}</strong></p>
    <button onclick="restartGame()">Jogar novamente</button>
  `;
}

function restartGame() {
  step = 0;
  score = 0;
  loadQuestion();
}

loadQuestion();

// Alternar modo escuro/claro
document.getElementById('mode-toggle').onclick = () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
};