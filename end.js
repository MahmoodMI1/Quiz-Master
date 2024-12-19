const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');


const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

// Enable button depending on the input
username.addEventListener('keyup', () =>{
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    e.preventDefault();
}