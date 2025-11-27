


let questionsCounter = 0; 
let score = 0; 
let quizQuestionsTotal = 0; 





function saveResult(quizName, totalQuestions, finalScore) {
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    
    
    const newResult = {
        timestamp: new Date().toISOString(),
        quizName: quizName,
        summary: `Correct answers: ${finalScore} / ${totalQuestions}`,
        answers: [], 
        totalQuestions: totalQuestions, 
        score: finalScore 
    };

    results.push(newResult);
    localStorage.setItem("quizResults", JSON.stringify(results));
}


window.addEventListener("DOMContentLoaded", () => {
    const quizList = document.getElementById("quizList");
    if (!quizList) return;

    const quizzes = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    const categories = [...new Set(quizzes.map(q => q.category))];

    if (categories.length === 0) {
        quizList.innerHTML = "<p>There aren't any quizes now. Create them on page 'Create'.</p>";
        return;
    }

    categories.forEach(cat => {
        const quizInfo = quizzes.find(q => q.category === cat);
        const totalCount = quizzes.filter(q => q.category === cat).length;
        
        const div = document.createElement("div");
        div.className = "quiz-item";
        div.innerHTML = `
            <h3>${cat} (${totalCount} answers)</h3>
            <p>${quizInfo ? quizInfo.description : "Without description"}</p>
            <button onclick="startCategory('${cat}')">Start</button>
        `;
        quizList.appendChild(div);
    });
});


function startCategory(category) {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "quizPage.html"; 
}



window.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".quiz-container");
    
    if (!container || !document.location.pathname.includes("quizPage.html")) return;

    const category = localStorage.getItem("selectedCategory");
    if (category) {
         
        questionsCounter = 0;
        score = 0;
        
       
        const allQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
        quizQuestionsTotal = allQuestions.filter(q => q.category === category).length;

        startQuiz(category);
    } else {
        container.innerHTML = "<p>Please, choose a quiz on page <a href='play.html'>Play</a>.</p>";
    }
});


function startQuiz(category) {
    const container = document.querySelector(".quiz-container");

    const allQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    let usedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];

    
    let availableQuestions = allQuestions.filter(
        q => q.category === category && !usedQuestions.some(u => u.question === q.question)
    );

   
    if (availableQuestions.length === 0) {
        
        
        saveResult(category, quizQuestionsTotal, score); 
        
        
        container.innerHTML = `
            <h2>Quiz "${category}" is finished!</h2>
            <p>Your final score: **${score}** of **${quizQuestionsTotal}**.</p>
            <button onclick="window.location.href='play.html'">Choose another quiz</button>
            <button onclick="window.location.href='result.html'">Check results</button>
        `;
        
        
        localStorage.removeItem('usedQuestions');
        return;
    }

   
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const q = availableQuestions[randomIndex];

   
    usedQuestions.push(q);
    localStorage.setItem('usedQuestions', JSON.stringify(usedQuestions));

    questionsCounter++;

    
    container.innerHTML = `
        <h2>${q.question}</h2>
        <p>Question ${questionsCounter} of ${quizQuestionsTotal}</p>
        ${q.answers.map(
            (opt, i) => `
                <label><input type="radio" name="answer" value="${i}"> ${opt}</label><br>
            `
        ).join('')}
        <button id="submitBtn">Answer</button>
    `;

    document.getElementById('submitBtn').addEventListener('click', () => {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) {
            alert("Choose an option!");
            return;
        }

        const selectedIndex = parseInt(selected.value);
        let isCorrect = q.correct.includes(selectedIndex);

        if (isCorrect) {
            score++;
            alert("Correct!");
        } else {
            alert(`Incorrect. Correct answer: ${q.answers[q.correct[0]]}`);
        }

       
        startQuiz(category);
    });
}
