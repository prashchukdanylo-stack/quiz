document.addEventListener("DOMContentLoaded", loadResults);
document.getElementById("clear-history-btn")?.addEventListener("click", clearAllResults);



function loadResults() {
    const resultsListContainer = document.getElementById("results-list");
    const noResultsMessage = document.getElementById("no-results-message");
    const clearButton = document.getElementById("clear-history-btn");

    const results = JSON.parse(localStorage.getItem("quizResults")) || [];

    resultsListContainer.innerHTML = ""; 

    if (results.length === 0) {
        noResultsMessage.style.display = 'block';
        if (clearButton) clearButton.style.display = 'none';
        return;
    }

    noResultsMessage.style.display = 'none';
    if (clearButton) clearButton.style.display = 'block';

    
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


    
    results.forEach(result => {
        
        const date = new Date(result.timestamp).toLocaleString('uk-UA', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
        
        const listItem = document.createElement("li");
        listItem.className = "quiz-item result-item";
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';

        listItem.innerHTML = `
            <div>
                <h3>Result: ${result.quizName}</h3>
                <p>Date: **${date}**</p>
                <p>Total score: **${result.summary || `${result.score}/${result.totalQuestions}`}**</p>
            </div>
            <button onclick="deleteResult('${result.timestamp}')" class = "result-delete">Delete</button>
        `;
        resultsListContainer.appendChild(listItem);
    });
}


function deleteResult(timestamp) {
    if (!confirm("Are you sure that you eant to delete this result?")) {
        return;
    }

    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    const updatedResults = results.filter(r => r.timestamp !== timestamp);

    localStorage.setItem("quizResults", JSON.stringify(updatedResults));
    
    alert("Result is deleted successfully.");
    loadResults();
}


function clearAllResults() {
     if (!confirm("Are you sure that you want to clear ALL result history?")) {
        return;
    }

    localStorage.removeItem("quizResults");
    
    alert("All result history is cleared.");
    loadResults();
}