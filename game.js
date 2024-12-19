const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS  = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // spread operater a copy to point at another object
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("*/end.html");
    }
    questionCounter++;
    // display counter 
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`

    // Random number between 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]; // random question from copied array
    question.innerText = currentQuestion.question; // display it 
    // iterate through each choices
    choices.forEach( choice => { 
        const number = choice.dataset['number']; // get the number of tyhe data number
        choice.innerText = currentQuestion['choice' + number];// since the keys are labled choice 1, 2 ,3
    });
    
    availableQuestions.splice(questionIndex, 1); // remove repitition in questions

    acceptingAnswers = true;
};

choices.forEach(choice => {
    // answer choosing if we are accepting answers
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        // selecting answer
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        // add score for right answers
        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        // adding a class to parent element when clicked to style 
        selectedChoice.parentElement.classList.add(classToApply);

        //give a delay until we delete it
        setTimeout( ()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            // add and event listener to next button 
            getNewQuestion();
        }, 1000)

        console.log(selectedAnswer == currentQuestion.answer);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
startGame();