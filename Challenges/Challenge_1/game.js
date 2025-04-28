// game.js

// Game Manager Module
const GameManager = (() => {
    // Private state
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Cached DOM elements
    const $progressContainer = $("#progress-container");
    const $questionContainer = $('#question-container');
    const $optionsContainer = $('#options-container');
    const $feedbackContainer = $('#feedback-container');
    const $nextButton = $('#next-button');
    const $scoreContainer = $('#score-container');

    // Initialize game
    function init() {
        questions = QuestionBank.getAllQuestions(); // Fetch from QuestionBank
        currentQuestionIndex = 0;
        score = 0;

        renderQuestion();
        attachEventListeners();
        updateScore();
    }

    // Render current question and options
    function renderQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) {
            showFinalScore();
            return;
        }

        $progressContainer.text(`Question ${currentQuestionIndex + 1}/${questions.length}`);

        $questionContainer.text(currentQuestion.questionText);
        $optionsContainer.empty();
        $feedbackContainer.text('');
        $nextButton.hide();

        currentQuestion.options.forEach(option => {
            const $button = $('<button></button>')
                .addClass('option-button')
                .text(option)
                .click(() => handleAnswer(option));
            $optionsContainer.append($button);
        });
    }

    // Handle answer click
    function handleAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        $feedbackContainer.fadeOut(200, function () {
            if (isCorrect) {
                $feedbackContainer
                    .text('Correct!')
                    .css('color', 'green');
                score++;
                updateScore();
            } else {
                $feedbackContainer
                    .text('Wrong! Correct answer was: ${currentQuestion.correctAnswer}')
                    .css('color', 'red');
            }
            $feedbackContainer.fadeIn(200);
        });
        $optionsContainer.find('button').each(function () {
            const $btn = $(this);
            $btn.prop('disabled', true);

            if ($btn.text() === currentQuestion.correctAnswer) {
                $btn.addClass('correct-option');
            }
            if ($btn.text() === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
                $btn.addClass('wrong-option');
            }
        })
        $nextButton.show();
    }

    // Attach event listeners
    function attachEventListeners() {
        $nextButton.click(() => {
            currentQuestionIndex++;
            renderQuestion();
        });
    }

    // Update score display
    function updateScore() {
        $scoreContainer.text(`Score: ${score}/${questions.length}`);
    }

    // Show final score
    function showFinalScore() {
        $('#app').html(`
            <h1>Game Over!</h1>
            <p>Your final score is ${score} out of ${questions.length}.</p>
            <button id="restart-button">Play Again</button>
        `);

        $('#restart-button').click(() => {
            location.reload();
        });
    }

    // Expose init method
    return {
        init
    };
})();

// Start the game when page is ready
$(document).ready(() => {
    GameManager.init();
});
