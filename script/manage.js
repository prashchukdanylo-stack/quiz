document.addEventListener("DOMContentLoaded", loadManageQuizzes);


function loadManageQuizzes() {
    const quizListContainer = document.getElementById("quiz-list");
    const noQuizzesMessage = document.getElementById("no-quizzes-message");
    
    const allQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    
    const categoriesMap = new Map();
    allQuestions.forEach(q => {
        
        if (!categoriesMap.has(q.category)) {
            categoriesMap.set(q.category, { 
                description: q.description || "No description provided", 
                count: 0 
            });
        }
        categoriesMap.get(q.category).count++;
    });

    const categories = Array.from(categoriesMap.keys());

    quizListContainer.innerHTML = ""; 

    if (categories.length === 0) {
        noQuizzesMessage.style.display = 'block';
        return;
    }

    noQuizzesMessage.style.display = 'none';

    
    categories.forEach(categoryName => {
        const info = categoriesMap.get(categoryName);
        const listItem = document.createElement("li");
        listItem.className = "quiz-item manage-item"; 
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';

        listItem.innerHTML = `
            <div>
                <h3>${categoryName} <span style="font-size: 0.9em; color: #666;">(${info.count} questions)</span></h3>
                <p>${info.description}</p>
            </div>
            <button onclick="deleteQuiz('${categoryName}')" class ="result-delete">Delete</button>
        `;
        quizListContainer.appendChild(listItem);
    });
}


function deleteQuiz(categoryName) {
    if (!confirm(`Are you sure you want to delete this quiz"${categoryName}"?`)) {
        return;
    }

    
    let allQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    
    const updatedQuestions = allQuestions.filter(q => q.category !== categoryName);

    
    localStorage.setItem("quizQuestions", JSON.stringify(updatedQuestions));

    alert(`Quiz "${categoryName}" is successfully deleted.`);
    
    
    loadManageQuizzes();
}