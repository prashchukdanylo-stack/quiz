// ============================
// === Додавання питань ===
// ============================

function addQuestion() {
  const area = document.getElementById("questionsArea");
  const count = area.querySelectorAll(".questionContainer").length + 1;

  const div = document.createElement("div");
  div.className = "questionContainer";
  div.innerHTML = `
    <h3>Question ${count}</h3>
        <input class="questionInput" placeholder="Text of question"><br><br>
        <input class="optionInput" placeholder="Option 1"><br>
        <input class="optionInput" placeholder="Option 2"><br>
        <input class="optionInput" placeholder="Option 3"><br>
        <input class="optionInput" placeholder="Option 4"><br><br>
        <input class="answerInput" placeholder="Number of correct answer"><br>
  `;
  area.appendChild(div);
};


// ============================
// === Збереження квізу ===
// ============================

function quizMaker() {
  const quizName = document.getElementById("quizName").value.trim();
  const quizDescription = document.getElementById("quizDescription").value.trim();
  const containers = document.querySelectorAll(".questionContainer");

  if (!quizName) {
    alert("Write question's name!");
    return;
  }

  let questionsArr = [];

  containers.forEach(container => {
    const question = container.querySelector(".questionInput").value.trim();
    const options = Array.from(container.querySelectorAll(".optionInput")).map(o => o.value.trim());
    const correctIndex = parseInt(container.querySelector(".answerInput").value) - 1;

    if (!question || options.some(o => !o)) return;
    if (isNaN(correctIndex) || correctIndex < 0 || correctIndex >= options.length) return;

    questionsArr.push({
      category: quizName,
      description: quizDescription,
      question: question,
      answers: options,
      correct: [correctIndex]
    });
  });

  if (questionsArr.length === 0) {
    alert("There are no questions to save!");
    return;
  }

  const existing = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  localStorage.setItem("quizQuestions", JSON.stringify([...existing, ...questionsArr]));

  alert(`Quiz "${quizName}" is saved successfully (${questionsArr.length} questions)!`);
}