const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');

const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];// if there is nothing in local (null) return []

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

// Enable button depending on the input
username.addEventListener('keyup', () =>{
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);// add to the list
    highScores.sort ((a,b) => { 
        return b.score - a.score // if b score > a score put b before a
    })
    highScores.splice(5) // Cut everything after fifth index

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('https://mahmoodmi1.github.io/Quiz-Master/');
};