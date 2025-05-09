// questions.js

// Encapsulate questions into a single exportable object
const QuestionBank = (() => {
    const questions = [
        {
            id: 1,
            questionText: "What does `typeof undefined` return in JavaScript?",
            options: [
                "'null'",
                "'undefined'",
                "'object'",
                "'NaN'"
            ],
            correctAnswer: "'undefined'"
        },
        {
            id: 2,
            questionText: "Which HTML tag is used to link an external CSS file?",
            options: [
                "<script>",
                "<style>",
                "<link>",
                "<css>"
            ],
            correctAnswer: "<link>"
        },
        {
            id: 3,
            questionText: "In JavaScript, which keyword is used to declare a constant variable?",
            options: [
                "var",
                "const",
                "let",
                "static"
            ],
            correctAnswer: "const"
        },
        {
            id: 4,
            questionText: "Which HTML attribute is used to open a link in a new tab?",
            options: [
                "href",
                "target",
                "rel",
                "newtab"
            ],
            correctAnswer: "target"
        },
        {
            id: 5,
            questionText: "What will `document.getElementById('demo')` return if no such element exists?",
            options: [
                "undefined",
                "null",
                "false",
                "error"
            ],
            correctAnswer: "null"
        },
        {
            id: 6,
            questionText: "Which HTML tag defines a table row?",
            options: [
                "<td>",
                "<tr>",
                "<th>",
                "<row>"
            ],
            correctAnswer: "<tr>"
        },
        {
            id: 7,
            questionText: "Which built-in method combines the text of two strings in JavaScript?",
            options: [
                "append()",
                "combine()",
                "concat()",
                "attach()"
            ],
            correctAnswer: "concat()"
        },
        {
            id: 8,
            questionText: "Which HTML tag is used to insert a line break?",
            options: [
                "<break>",
                "<br>",
                "<lb>",
                "<newline>"
            ],
            correctAnswer: "<br>"
        },
        {
            id: 9,
            questionText: "Which of these is a valid way to write a comment in JavaScript?",
            options: [
                "# comment",
                "// comment",
                "<!-- comment -->",
                "-- comment"
            ],
            correctAnswer: "// comment"
        },
        {
            id: 10,
            questionText: "What does the `<input type='checkbox'>` element do?",
            options: [
                "Creates a button",
                "Creates a single-line text field",
                "Creates a multiple-choice selector",
                "Creates a checkable box"
            ],
            correctAnswer: "Creates a checkable box"
        }
    ];

    // Public API
    return {
        getAllQuestions: () => [...questions], // Return a copy to prevent modification
        getQuestionById: (id) => questions.find(q => q.id === id),
        getRandomQuestion: () => questions[Math.floor(Math.random() * questions.length)]
    };
})();
