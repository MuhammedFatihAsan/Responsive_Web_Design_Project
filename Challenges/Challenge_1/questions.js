// questions.js

// Encapsulate questions into a single exportable object
const QuestionBank = (() => {
    const questions = [
        {
            id: 1,
            questionText: "What does `typeof null` return in JavaScript?",
            options: [
                "'object'",
                "'null'",
                "'undefined'",
                "'function'"
            ],
            correctAnswer: "'object'"
        },
        {
            id: 2,
            questionText: "Which one is NOT a programming language?",
            options: [
                "Python",
                "Java",
                "HTML",
                "C++"
            ],
            correctAnswer: "HTML"
        },
        {
            id: 3,
            questionText: "What is the output of `console.log(2 + '2')`?",
            options: [
                "4",
                "22",
                "NaN",
                "undefined"
            ],
            correctAnswer: "22"
        },
        {
            id: 4,
            questionText: "Which symbol is used for comments in JavaScript?",
            options: [
                "//",
                "/* */",
                "#",
                "<!-- -->"
            ],
            correctAnswer: "//"
        }
    ];

    // Public API
    return {
        getAllQuestions: () => [...questions], // Return a copy to prevent modification
        getQuestionById: (id) => questions.find(q => q.id === id),
        getRandomQuestion: () => questions[Math.floor(Math.random() * questions.length)]
    };
})();
