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
        <input class="answerInput" placeholder="Number of correct answer (e.g., 1 or 3)"><br>
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
        alert("Please, write the name of quiz!");
        return;
    }

    let questionsArr = [];
    let allQuestionsValid = true;

    containers.forEach((container, index) => {
        if (!allQuestionsValid) return;

        const question = container.querySelector(".questionInput").value.trim();
        const optionInputs = container.querySelectorAll(".optionInput");
        const options = Array.from(optionInputs).map(o => o.value.trim());
        const correctIndex = parseInt(container.querySelector(".answerInput").value) - 1;

        if (!question) {
            alert(`Error in question ${index + 1}: There must be a text in question.`);
            allQuestionsValid = false;
            return;
        }

        if (options.some(o => !o)) {
            alert(`Error in question ${index + 1}: All 4 variants need to be filled.`);
            allQuestionsValid = false;
            return;
        }

        if (isNaN(correctIndex) || correctIndex < 0 || correctIndex >= options.length) {
            alert(`Error in question ${index + 1}: Invalid number of correct answer. Write a number from 1 to ${options.length}.`);
            allQuestionsValid = false;
            return;
        }
        
      
        questionsArr.push({
            category: quizName,
            description: quizDescription,
            question: question,
            answers: options,
            correct: [correctIndex] 
        });
    });

    
    if (!allQuestionsValid) {
        return;
    }

    if (questionsArr.length === 0) {
        alert("Problem with question!");
        return;
    }

    
    const existing = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    localStorage.setItem("quizQuestions", JSON.stringify([...existing, ...questionsArr]));

    alert(`Quiz "${quizName}" is saved successfully with (${questionsArr.length} questions)!`);
    
    
    document.getElementById("quizName").value = '';
    document.getElementById("quizDescription").value = '';
    
    const questionsArea = document.getElementById("questionsArea");
    questionsArea.innerHTML = '';
    
    addQuestion(); 
}