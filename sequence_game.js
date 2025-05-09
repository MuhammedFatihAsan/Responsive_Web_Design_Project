let puzzles = [];
let currentIndex = 0;
let correctAnswers = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch('sequence_game_data.json')
        .then(response => response.json())
        .then(data => {
            puzzles = data;
            startGame(puzzles[currentIndex]);
        });
});

function startGame(puzzle) {
    const gameArea = document.getElementById('gameArea');
    const shuffledLines = shuffleArray([...puzzle.correctOrder]);

    gameArea.innerHTML = `
        <h2>${puzzle.title} - <small>${puzzle.difficulty}</small></h2>
        <p class="puzzle-description">${puzzle.description}</p>
        <ul id="codeLines">
            ${shuffledLines.map(line => `<li>${line}</li>`).join('')}
        </ul>
    `;

    document.getElementById('scoreTracker').textContent = `Score: ${correctAnswers} / ${puzzles.length}`;
    document.getElementById('feedback').textContent = "";
    $("#codeLines").sortable();
}


document.getElementById('submitOrder').onclick = function() {
    const userOrder = $("#codeLines li").map(function() { return $(this).text(); }).get();
    const correctOrder = puzzles[currentIndex].correctOrder;

    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
        correctAnswers++;
        currentIndex++;

        if (currentIndex < puzzles.length) {
            document.getElementById('feedback').textContent = "✅ Correct! Moving to the next puzzle...";
            setTimeout(() => startGame(puzzles[currentIndex]), 1500);
        } else {
            document.getElementById('gameArea').innerHTML = `
                <h2>🎉 Congratulations! You completed all puzzles!</h2>
                <p>Final Score: ${correctAnswers} / ${puzzles.length}</p>
            `;
            document.getElementById('scoreTracker').textContent = `Score: ${correctAnswers} / ${puzzles.length}`;
            document.getElementById('feedback').textContent = "";
        }
    } else {
        document.getElementById('feedback').textContent = "❌ Incorrect. Try again.";
    }
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
