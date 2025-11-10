


function saveQuestion() {
  const questionText = document.getElementById('questionText').value;
  const answerInputs = document.querySelectorAll('#create .answer-input');
  const checkBoxes = document.querySelectorAll('#create .correct-check');

  let answers = [];
  let correct = [];

  answerInputs.forEach((input, index) => {
    answers.push(input.value);
    if (checkBoxes[index].checked) correct.push(index);
  });

  let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
  questions.push({ question: questionText, answers, correct });
  localStorage.setItem('quizQuestions', JSON.stringify(questions));

  document.getElementById('questionText').value = '';
  answerInputs.forEach(input => input.value = '');
  checkBoxes.forEach(checkbox => checkbox.checked = false);

  alert('Питання збережено!');
}


let questionsCounter = 0;


function startQuiz() {
  const container = document.querySelector('.quiz-container');
const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
 const usedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];

 if (questions.length === 0) {
  container.innerHTML = "<p>No questions found. Please add some first.</p>";
} else {

   const element = Math.floor(Math.random() * questions.length);

  const q = questions[element];
  questions.splice(element, 1);
  
  localStorage.setItem('quizQuestions', JSON.stringify(questions));
  localStorage.setItem('usedQuestions', JSON.stringify(usedQuestions));
  questionsCounter++;

  container.innerHTML = `
    <h2>${q.question}</h2>
    ${q.answers.map((opt, i) => `
      <label>
        <input type="radio" name="answer" value="${i}">
        ${opt}
      </label><br>
    `).join('')}
    <button id="submitBtn">Submit</button>
  `;

  document.getElementById('submitBtn').addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert("Select an answer first!");
      return;
    }

    const correct = q.correct.includes(parseInt(selected.value));
    if (questionsCounter === 10) {
      alert('Quiz finished!');
      questionsCounter = 0;
      localStorage.clear();
    } else {
      startQuiz();
    }
  });
}
}

function checkResults(questions) {
  let score = 0;
  questions.forEach((q, index) => {
    const selected = Array.from(document.querySelectorAll(`input[name='q${index}']:checked`))
      .map(el => parseInt(el.value));
    if (JSON.stringify(selected.sort()) === JSON.stringify(q.correct.sort())) score++;
  });

  const percent = ((score / questions.length) * 100).toFixed(2);
  document.getElementById('result').innerHTML =
    `Правильних відповідей: ${score} із ${questions.length} (${percent}%)`;
}

// Optional: preload one sample question
let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];

  questions.push({
    question: "Why were you?",
    answers: ["sigma", "rigi"],
    correct: [0],

  },
  {
    question: "Wtf?",
    answers: ['yes', 'no', 'mb'],
    correct: [0, 2],
  },

  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correct: [0]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: [1]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: [1]
  },
  {
    question: "What is 9 × 7?",
    answers: ["56", "63", "72", "69"],
    correct: [1]
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"],
    correct: [1]
  },
  {
    question: "In which year did World War II end?",
    answers: ["1945", "1939", "1918", "1961"],
    correct: [0]
  },
  {
    question: "Which metal is liquid at room temperature?",
    answers: ["Iron", "Mercury", "Aluminum", "Silver"],
    correct: [1]
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correct: [2]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["O2", "H2O", "CO2", "HO"],
    correct: [1]
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    answers: ["Spanish", "Portuguese", "French", "English"],
    correct: [1]
  }
);
  localStorage.setItem('quizQuestions', JSON.stringify(questions));
