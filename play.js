// === Глобальні змінні ===
let questionsCounter = 0;
let score = 0;



// ============================
// === Список квізів ===
// ============================
window.addEventListener("DOMContentLoaded", () => {
  const quizList = document.getElementById("quizList");
  if (!quizList) return;

  const quizzes = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  const categories = [...new Set(quizzes.map(q => q.category))];

  if (categories.length === 0) {
    quizList.innerHTML = "<p>There are no any created quizes. Make them on page 'Create'.</p>";
    return;
  }

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "quiz-item";
    div.innerHTML = `
      <h3>${cat}</h3>
      <p>${quizzes.find(q => q.category === cat).description || "No description"}</p>
      <button onclick="startCategory('${cat}')">Start</button>
    `;
    quizList.appendChild(div);
  });
});

// ============================
// === Перехід до гри ===
// ============================
function startCategory(category) {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "quizPage.html";
}

// ============================
// === Гра (виконання квізу) ===
// ============================
window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".quiz-container");
  if (!container) return;

  const category = localStorage.getItem("selectedCategory");
  if (category) startQuiz(category);
});

function startQuiz(category) {
  const container = document.querySelector(".quiz-container");

  const allQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
  let usedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];

  let availableQuestions = allQuestions.filter(
    q => q.category === category && !usedQuestions.some(u => u.question === q.question)
  );

  if (availableQuestions.length === 0) {
    container.innerHTML = `<p> Quiz "${category}" is finished!</p>`;
    localStorage.removeItem('usedQuestions');
    questionsCounter = 0;
    score = 0;
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const q = availableQuestions[randomIndex];

  usedQuestions.push(q);
  localStorage.setItem('usedQuestions', JSON.stringify(usedQuestions));

  questionsCounter++;

  container.innerHTML = `
    <h2>${q.question}</h2>
    ${q.answers.map(
      (opt, i) => `
        <label><input type="radio" name="answer" value="${i}"> ${opt}</label><br>
      `
    ).join('')}
    <button id="submitBtn">Answer</button>
    <p>Question ${questionsCounter}</p>
  `;

  document.getElementById('submitBtn').addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert("Choose an option at first!");
      return;
    }

    const selectedIndex = parseInt(selected.value);
    if (q.correct.includes(selectedIndex)) {
      score++;
      alert("Correct!");
    } else {
      alert(`Incorrect. The right answer is ${q.answers[q.correct[0]]}`);
    }

    startQuiz(category);
  });
}