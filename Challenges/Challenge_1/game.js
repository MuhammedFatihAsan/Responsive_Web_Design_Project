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
        $("#progressbar").progressbar({ value: 0 });
        questions = QuestionBank.getAllQuestions(); // Fetch from QuestionBank
        console.log("Questions loaded:", questions); // ✅ log to confirm
        currentQuestionIndex = 0;
        score = 0;

        renderQuestion();
        attachEventListeners();
        updateScore();
    }


    // Render current question and options
    function renderQuestion() {
        // Safety check: no questions at all
        if (!questions || questions.length === 0) {
            $questionContainer.text("No questions available.");
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        console.log("Rendering question:", currentQuestion);

        // If no more questions, end the quiz
        if (!currentQuestion) {
            showFinalScore();
            return;
        }

        // ✅ Safe to update progress now
        // update numeric percentage
        const progress = Math.round((currentQuestionIndex / questions.length) * 100);
        $("#progress-label-inside").text(`${progress}%`);

        // tell the widget its value …
        $("#progressbar").progressbar("value", progress);

        // …and force the green bar to that same width
        $("#progressbar .ui-progressbar-value").css("width", progress + "%");


        // Update question and options
        $progressContainer.text(`Question ${currentQuestionIndex + 1}/${questions.length}`);
        $questionContainer.hide().text(currentQuestion.questionText).fadeIn(200);
        $optionsContainer.empty();
        $feedbackContainer.text('');
        $nextButton.hide();

        // Create answer buttons
        currentQuestion.options.forEach(option => {
            const $button = $('<button></button>')
                .addClass('option-button')
                .text(option)
                .attr('title', 'Choose')
                .click(() => handleAnswer(option));
            $optionsContainer.append($button);
        });

        // Activate tooltips again
        $('[title]').tooltip();

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
                    .text(`Wrong! Correct answer was: ${currentQuestion.correctAnswer}`)
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
        $nextButton.off('click'); // ✅ Detach previous listeners first
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
        // Hide the main quiz UI
        // $('#app').hide();
        $('#app').css('opacity', 0.3); // ✅ soft fade-out look

        // Set the score inside the dialog
        $('#final-score-text').text(`Your final score is ${score} out of ${questions.length}.`);

        // Show the jQuery UI Dialog
        $('#gameover-dialog').dialog({
            modal: true,
            width: 400,
            buttons: {
                "Play Again": function () {
                    $(this).dialog("close");
                    restartGame();
                }
            }
        });

        $("#progressbar").progressbar("value", 100);
    }

    function restartGame() {
        $.confirm({
            title: 'Restart Game?',
            content: 'Are you sure you want to restart the quiz from the beginning?',
            boxWidth: '300px',       // ✅ Smaller width
            useBootstrap: false,     // ✅ Clean default style
            backgroundDismiss: true, // ✅ Close if clicked outside
            theme: 'modern',         // ✅ More modern look
            closeIcon: true,         // ✅ Adds a little [x] in top-right
            buttons: {
                confirm: {
                    text: 'Yes',
                    btnClass: 'btn-green',
                    action: function () {
                        $('#gameover-dialog').hide();
                        $('#app').show();
                        GameManager.init();
                    }
                },
                cancel: {
                    text: 'No',
                    btnClass: 'btn-default'
                }
            }
        });
        $('#gameover-dialog').hide();
        $('#app').css('opacity', 1); // ✅ bring full opacity back
        GameManager.init();
    }

    // Expose init method
    return {
        init
    };
})();

// Start the game when page is ready
$(document).ready(() => {
    GameManager.init();
    console.log("jQuery UI version loaded:", $.ui.version);
    $('#accordion').accordion({
        collapsible: true,
        active: false // Start with all sections closed (optional)
    });
    
    $.alert({
        title: 'Welcome to Programming Challenge!',
        content: 'Test your JavaScript knowledge. Answer each question, and try to score 100%. Good luck!',
        boxWidth: '400px',
        useBootstrap: false
    });
});