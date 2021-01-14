// set the rock, paper scissor buttons
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const resetButton = document.querySelector("#reset"); 

rockButton.addEventListener("click", playRound);
paperButton.addEventListener("click", playRound);
scissorsButton.addEventListener("click", playRound);


function playRound(e) {
    if (isGameOver()) {
        (scoreHeading.textContent = "Reset to play again!");
        return;
    }
    const playerSelection = e.target.id;
    const computerSelection = computerPlay();

    e.target.classList.add('selection');

        console.log("player: " + playerSelection);
        console.log("cpu: " + computerSelection);

    updateScore(getWinner(playerSelection, computerSelection));
    updateChoices(playerSelection, computerSelection);
}


// transitions
function removeTransition(e){
    if (e.propertyName !== 'transform') return; // skip it if its not a transform
    this.classList.remove('selection');
}
const choices = document.querySelectorAll('.choice-span');
choices.forEach(choice => choice.addEventListener('transitionend', removeTransition));


// set the scores
const scoreHeading = document.querySelector("#score-heading");
const playerScoreBox = document.getElementById("player-score");
const compScoreBox = document.getElementById("comp-score");
let playerScore = 0;
let compScore = 0;
let roundCount = 0;

// randomize headings
const heading = document.querySelector("#heading");

function randomHeading(){
    const headingHTML = heading.innerHTML;
    let options = ['Choose wisely!', 'You can do it!', 'No pressure!','You got this!', "Don't mess up!", 'I believe in you!', "Don't quit now!", 'This is fun!', 'Having fun?'];
    const index = options.indexOf(headingHTML);
    options.splice(index, 1);
    let rand = Math.floor(Math.random()*options.length);
    let selection = options[rand];
    return selection;
};

function computerPlay(){
    let options = ['rock', 'paper', 'scissors'];
    let rand = Math.floor(Math.random()*options.length);
    let selection = options[rand];
    return selection;
};

function updateScore(winner) {
    if (winner === "tie") {
        scoreHeading.textContent = "Tie"
    } else if (winner === "player") {
        playerScore++;
        roundCount++;
        scoreHeading.textContent = "Round " + roundCount +": You win!";
    } else if (winner === "computer") {
        compScore++;
        roundCount++;
        scoreHeading.textContent = "Round " + roundCount +": CPU wins!";
    }
    playerScoreBox.innerHTML = playerScore;
    compScoreBox.innerHTML = compScore;
    if (isGameOver()) setFinalMessage();
  }

function getWinner(playerSelection, computerSelection){
    if (computerSelection.toLowerCase() == playerSelection.toLowerCase()){
        return "tie";
    } else if (
        (computerSelection.toLowerCase() === "rock" && playerSelection.toLowerCase() === "scissors") ||
        (computerSelection.toLowerCase() === "scissors" && playerSelection.toLowerCase() === "paper") ||
        (computerSelection.toLowerCase() === "paper" && playerSelection.toLowerCase() === "rock")){
        return "computer";
    } else {
        return "player";
    }
}


// game feed 
const feedDiv = document.querySelector("#feed");
const playerFeed = document.querySelector("#player-emoji");
const computerFeed = document.querySelector("#comp-emoji");

function updateChoices(playerSelection, computerSelection) {
    let playerSelectionEmoji = '';
    let computerSelectionEmoji = '';
    if(playerSelection === 'rock'){
        playerSelectionEmoji = '⛰️'
    } else if (playerSelection === 'paper'){
        playerSelectionEmoji = '🧾'
    } else if (playerSelection === 'scissors'){
        playerSelectionEmoji = '✂️'
    }
    if(computerSelection === 'rock'){
        computerSelectionEmoji = '⛰️';
    } else if (computerSelection === 'paper'){
        computerSelectionEmoji = '🧾';
    } else if (computerSelection === 'scissors'){
        computerSelectionEmoji = '✂️';
    }
    playerFeed.textContent = `${playerSelectionEmoji}`;
    computerFeed.textContent = `${computerSelectionEmoji}`;
}

function resetGame(){
    const newHeading = randomHeading();
    heading.textContent = newHeading;
    scoreHeading.textContent = "Let's play, first to 5 wins!";
    scoreHeading.style.cssText = 'color: black;';
    playerFeed.textContent = '';
    computerFeed.textContent = '';
    playerScore = 0;
    compScore = 0;
    roundCount = 0;
    playerScoreBox.innerHTML = playerScore;
    playerScoreBox.style.cssText = 'color: whitesmoke;'
    compScoreBox.innerHTML = compScore;
    compScoreBox.style.cssText = 'color: whitesmoke;'
    resetButton.removeEventListener("click", resetGame);
    resetButton.style.cssText = 'color: rgba(0, 0, 0, 0.3); background-color: rgba(0, 0, 0, 0.0);'
    resetButton.classList.add('disabled');
}

function setFinalMessage() {
    return playerScore > compScore
      ? ((scoreHeading.textContent = "Game over, you won!") && (scoreHeading.style.cssText = 'color: var(--winnerGreen);') && (playerScoreBox.style.cssText = 'color: goldenrod;'))
      : ((scoreHeading.textContent = "Game over, you lost!") && (scoreHeading.style.cssText = 'color: var(--loserRed);') && (compScoreBox.style.cssText = 'color: goldenrod;'));
}

function isGameOver() {
    turnOnResetButton();
    return playerScore === 5 || compScore === 5;
}

function turnOnResetButton() {
    if (playerScore === 5 || compScore === 5){
        resetButton.classList.remove('disabled');
        resetButton.addEventListener("click", resetGame);
        resetButton.style.cssText = 'color: black;'
    }
}