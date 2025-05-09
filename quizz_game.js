// Game Manager Module
const GameManager = (() => {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const $progressContainer = $("#progress-container");
    const $questionContainer = $('#question-container');
    const $optionsContainer = $('#options-container');
    const $feedbackContainer = $('#feedback-container');
    const $nextButton = $('#next-button');
    const $scoreContainer = $('#score-container');

    function init() {
        $("#progressbar").progressbar({ value: 0 });
        questions = QuestionBank.getAllQuestions();
        console.log("Questions loaded:", questions);
        currentQuestionIndex = 0;
        score = 0;

        renderQuestion();
        attachEventListeners();
        updateScore();
    }

    function renderQuestion() {
        if (!questions || questions.length === 0) {
            $questionContainer.text("No questions available.");
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) {
            showFinalScore();
            return;
        }

        const progress = Math.round((currentQuestionIndex / questions.length) * 100);
        $("#progress-label-inside").text(`${progress}%`);
        $("#progressbar").progressbar("value", progress);
        $("#progressbar .ui-progressbar-value").css("width", progress + "%");

        $progressContainer.text(`Question ${currentQuestionIndex + 1}/${questions.length}`);
        $optionsContainer.empty();
        $feedbackContainer.text('');
        $nextButton.hide();

        // Wrap question and options inside #question-box
        const $box = $('<div></div>').attr('id', 'question-box').addClass('question-card');
        const $questionTitle = $('<h2></h2>').text(currentQuestion.questionText);
        $box.append($questionTitle);

        currentQuestion.options.forEach(option => {
            const $button = $('<button></button>')
                .addClass('option-button')
                .text(option)
                .attr('title', 'Choose')
                .click(() => handleAnswer(option));
            $box.append($button);
        });

        $questionContainer.html($box);
        $('[title]').tooltip();
    }

    function handleAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        $feedbackContainer.fadeOut(200, function () {
            if (isCorrect) {
                $feedbackContainer.text('Correct!').css('color', 'green');
                score++;
                updateScore();
            } else {
                $feedbackContainer.text(`Wrong! Correct answer was: ${currentQuestion.correctAnswer}`).css('color', 'red');
            }
            $feedbackContainer.fadeIn(200);
        });

        $optionsContainer.find('button').each(function () {
            const $btn = $(this);
            $btn.prop('disabled', true);
            if ($btn.text() === currentQuestion.correctAnswer) $btn.addClass('correct-option');
            if ($btn.text() === selectedOption && selectedOption !== currentQuestion.correctAnswer) $btn.addClass('wrong-option');
        });

        $nextButton.show();
    }

    function attachEventListeners() {
        $nextButton.off('click').click(() => {
            currentQuestionIndex++;
            renderQuestion();
        });
    }

    function updateScore() {
        $scoreContainer.text(`Score: ${score}/${questions.length}`);
    }

    function showFinalScore() {
        $('#app').css('opacity', 0.3);
        $('#final-score-text').text(`Your final score is ${score} out of ${questions.length}.`);
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
            boxWidth: '300px',
            useBootstrap: false,
            backgroundDismiss: true,
            theme: 'modern',
            closeIcon: true,
            buttons: {
                confirm: {
                    text: 'Yes',
                    btnClass: 'btn-green',
                    action: function () {
                        $('#gameover-dialog').hide();
                        $('#app').show().css('opacity', 1);
                        GameManager.init();
                    }
                },
                cancel: { text: 'No', btnClass: 'btn-default' }
            }
        });
        $('#gameover-dialog').hide();
        $('#app').css('opacity', 1);
        GameManager.init();
    }

    return { init };
})();

// Initialize on page ready
$(document).ready(() => {
    GameManager.init();
    console.log("jQuery UI version loaded:", $.ui.version);
    $('#accordion').accordion({ collapsible: true, active: false });

    $.alert({
        title: 'Welcome to Programming Challenge!',
        content: 'Test your JavaScript knowledge. Answer each question, and try to score 100%. Good luck!',
        boxWidth: '400px',
        useBootstrap: false
    });
});
