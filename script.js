function Gameboard(name1, name2){
    const player1 = name1;
    const player2 = name2;

    let x_playing = true;

    let turnsTaken = 0;

    let checkForWin = false;

    //Returns true if it is crosses turn, false if noughts
    const getPlayer = () => x_playing;

    //Flips which players turn it is
    const switchPlayer = () => {x_playing = !x_playing};

    const incrementTurns = () => { turnsTaken++; if (turnsTaken == 3){ checkForWin = true;}};

    const winCheck = () => checkForWin;

    const gameboard = ['','','','','','','','',''];

    const resetGame = () => {
        x_playing = true;
        turnsTaken = 0;
        checkForWin = false;
    }

    return {getPlayer, switchPlayer, incrementTurns, gameboard, winCheck, resetGame};
}

const buttonPositions = [
    'top_left', 'top_mid', 'top_right',
    'mid_left', 'mid_mid', 'mid_right',
    'bottom_left', 'bottom_mid', 'bottom_right'
]

const Game = Gameboard("Sum1", "Sum2");

//Set the disabled state of all buttons - True, all buttons disabled. False, all buttons enabled
function setButtonDisabledState(state){
    document.getElementById("top_left").disabled = state;
    document.getElementById("top_mid").disabled = state;
    document.getElementById("top_right").disabled = state;

    document.getElementById("mid_left").disabled = state;
    document.getElementById("mid_mid").disabled = state;
    document.getElementById("mid_right").disabled = state;

    document.getElementById("bottom_left").disabled = state;
    document.getElementById("bottom_mid").disabled = state;
    document.getElementById("bottom_right").disabled = state;
}

function resetButtons(){
    document.getElementById("top_left").textContent = "";
    document.getElementById("top_mid").textContent = "";
    document.getElementById("top_right").textContent = "";

    document.getElementById("mid_left").textContent = "";
    document.getElementById("mid_mid").textContent = "";
    document.getElementById("mid_right").textContent = "";

    document.getElementById("bottom_left").textContent = "";
    document.getElementById("bottom_mid").textContent = "";
    document.getElementById("bottom_right").textContent = "";
}

function startNewGame(){
    setButtonDisabledState(false);
    resetButtons();
    Game.resetGame();

    for (let i = 0; i < 9; i++){
        Game.gameboard[i] = '';
    }

    //Game.gameboard.forEach(item => item='')

    document.getElementById("winningText").remove();
    document.getElementById("playAgainButton").remove();
}

function gameWon(winner){
    //Disable all remaining buttons
    setButtonDisabledState(true);

    //Display win message
    var winningText = document.createElement("p");
    winningText.id = "winningText";
    if (winner == "X"){
        winningText.textContent = "Crosses wins!";
    } else {
        winningText.textContent = "Noughts wins!";
    }
    document.getElementById("winningTextPlaceholder").appendChild(winningText);

    //Display play again button
    var playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play again";
    playAgainButton.id = "playAgainButton";
    playAgainButton.onclick = startNewGame;
    document.getElementById("winningTextPlaceholder").appendChild(playAgainButton);
}

function checkForWinner(){
    //Check direct centre tile for horizontal, vertical, and both diagonal win conditions
    if (Game.gameboard[4] == "X" || Game.gameboard[4] == "O"){
        //Horizontal win
        if (Game.gameboard[3] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[5]){
            gameWon(Game.gameboard[4]);
        }
        //Vertical win
        if (Game.gameboard[1] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[7]){
            gameWon(Game.gameboard[4]);
        }
        //Diagonal top left to bottom right
        if (Game.gameboard[0] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[8]){
            gameWon(Game.gameboard[4]);
        }
        //Diagonal bottom left to top right
        if (Game.gameboard[2] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[6]){
            gameWon(Game.gameboard[4]);
        }
    }

    //Check top left tile for horizontal and vertical win conditions
    if (Game.gameboard[0] == "X" || Game.gameboard[0] == "O"){
        //Horizontal win
        if (Game.gameboard[0] == Game.gameboard[1] && Game.gameboard[1] == Game.gameboard[2]){
            gameWon(Game.gameboard[0]);
        }
        //Vertical win
        if (Game.gameboard[0] == Game.gameboard[3] && Game.gameboard[3] == Game.gameboard[6]){
            gameWon(Game.gameboard[0]);
        }
    }
    //Check bottom right tile for horizontal and vertical win conditions
    if (Game.gameboard[8] == "X" || Game.gameboard[8] == "O"){
        //Horizontal win
        if (Game.gameboard[6] == Game.gameboard[7] && Game.gameboard[7] == Game.gameboard[8]){
            gameWon(Game.gameboard[8]);
        }
        //Vertical Win
        if (Game.gameboard[2] == Game.gameboard[5] && Game.gameboard[5] == Game.gameboard[8]){
            gameWon(Game.gameboard[8]);
        }
    }
}

function assignValue(position){
    var buttonClicked = document.getElementById(position);
    var buttonPos = buttonPositions.findIndex(pos => pos == position);
    if (Game.getPlayer()){
        buttonClicked.textContent = "X";
        Game.gameboard[buttonPos] = "X";
        Game.switchPlayer();
        Game.incrementTurns();

        if (Game.turnsTaken == 3){
            enableWinCheck()
        }

    } else {
        buttonClicked.textContent = "O";
        Game.gameboard[buttonPos] = "O";
        Game.switchPlayer();
    }

    //Assess all possible win conditions
    if (Game.winCheck()){
        checkForWinner();
    }
    buttonClicked.disabled = true;
}