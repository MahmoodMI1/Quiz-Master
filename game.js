const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const nextButton = document.getElementById("nextBtn");



let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
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

        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html');

    }
    questionCounter++;
    // display counter 
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`
    // update progress bar by changing width to the ratio of question answered/ total
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

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
            nextButton.addEventListener('click',getNewQuestion)
        }, 1000)
        

        console.log(selectedAnswer == currentQuestion.answer);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
