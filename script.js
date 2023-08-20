import { questions } from "./questions.js";

const startButton = document.getElementById("start-button");
const timer = document.getElementById("timer");
const timeLeftSpan = document.getElementById("time-left");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const viewHighscores = document.getElementById("view-highscores");

let currentQuestionIndex = 0;
let timeLeft = 60;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  console.log("Quiz started");
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  
  displayQuestion()
  startTimer()
};

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <h2>${question.question}</h2>
    ${question.options.map((option, index) => `
      <button class="option" data-index="${index}">${option}</button>
    `).join('')}
  `;
  questionContainer.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", checkAnswer);
  });
};

function checkAnswer(answer) {
  const selectedOptionIndex = parseInt(event.target.getAttribute("data-index"));
  const question = questions[currentQuestionIndex];

  if (selectedOptionIndex === question.answer) {
    console.log("Correct!");
    resultContainer.textContent = "Correct!";
  } else {
    resultContainer.textContent = "Wrong!";
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz()
    stoptimer()
  }};

function startTimer() {
  console.log("Timer started");
  const timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz()
    } else {
    timeLeft--;
    timeLeftSpan.textContent = timeLeft;
    }
  }, 1000);
};

function endQuiz() {
  console.log("Quiz ended");

  function stoptimer() {
    console.log("Timer stopped");
    clearInterval(timerInterval);
    timeLeftSpan.textContent = timeLeft;
  };

  questionContainer.innerHTML = '<h2>Quiz Ended!</h2>';
  resultContainer.innerHTML = '<p>Your final score is ' + timeLeft + '.</p>';
  document.getElementById('scoreForm').classList.remove('hidden');
};

function saveScore() {
  const initials = document.getElementById('initials').value;
  const score = timeLeft;

  if (initials && score) {
    const scoreEntry = { initials, score };
    let highScores = localStorage.getItem('highScores');
    
    if (!highScores) {
      highScores = [];
    } else {
      highScores = JSON.parse(highScores);
    }

    highScores.push(scoreEntry);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    document.getElementById('initials').value = '';
    document.getElementById('score').value = '';
  }
}

viewHighscores.addEventListener("click", viewHighScores);

function viewHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const scoreList = document.getElementById('scoreList');
  scoreList.innerHTML = '';

  highScores.sort((a, b) => b.score - a.score);

  for (const scoreEntry of highScores) {
    const listItem = document.createElement('li');
    listItem.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
    scoreList.appendChild(listItem);
  }

  document.getElementById('highScores').classList.remove('hidden');
}
