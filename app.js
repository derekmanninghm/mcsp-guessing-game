var playerList = {
    ...localStorage
};
var guessCount = null;
var currentGuess = null;
var currentPlayer = null;
function addPlayer(name) {
    playerList[name] = null;
}

function getName() {
    while(currentPlayer == "" || currentPlayer == null) {
        currentPlayer = prompt('What is your name?');
    }
    if(!(currentPlayer in playerList)) {
        addPlayer(currentPlayer);
    }
}

function getGuess() {
    guessCount++;
    currentGuess =  prompt('Guess a number between 1 and 100');
}

function playAgain() {
    var response = (prompt(`Play again? "Yes" or "No"`)).toLowerCase();
    
    if(response ==  'yes' || response == 'y') {
        playGame();
    }

}

playAgain();

function playGame() {
    guessCount = 0;
    currentPlayer = null;
    var secretNum = Math.floor(Math.random() * (100-1) + 1);
    console.log(secretNum);
    getName();
    getGuess();


    while(currentGuess != secretNum) {
        if(currentGuess == "" || currentGuess == null) {
            alert('Game has been cancelled');
            break;
        } else if(currentGuess > secretNum) {
            alert(`Sorry ${currentPlayer}, Guess Lower`);
            getGuess();
        } else if(currentGuess < secretNum) {
            alert(`Sorry ${currentPlayer}, Guess Higher`);
            getGuess();
        }
    }
    // game won case
    if(currentGuess == secretNum) {
        if(playerList[currentPlayer] == null) {
            playerList[currentPlayer] = guessCount;
            alert(`That’s Correct ${currentPlayer}! This is your first time beating the game!`);
        }else if(guessCount < playerList[currentPlayer]) {
            alert(`That’s Correct ${currentPlayer}! And you beat your previous attempt by ${playerList[currentPlayer] - guessCount} fewer guesse(s)!`);
            playerList[currentPlayer] = guessCount;
        }else if(guessCount > playerList[currentPlayer]) {
            alert(`That’s Correct ${currentPlayer}! You did better in your last game by ${guessCount - playerList[currentPlayer]} fewer guesse(s).`);
        } else if(guessCount == playerList[currentPlayer]) {
            alert(`That’s Correct ${currentPlayer}! You tied your high score for lowest guesses!`);
        }
        localStorage.setItem(currentPlayer, playerList[currentPlayer]);
        playAgain()
    }
}
