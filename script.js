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

    return {getPlayer, switchPlayer, incrementTurns, gameboard, winCheck};
}

const buttonPositions = [
    'top_left', 'top_mid', 'top_right',
    'mid_left', 'mid_mid', 'mid_right',
    'bottom_left', 'bottom_mid', 'bottom_right'
]

const Game = Gameboard("Sum1", "Sum2");

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
        //Check direct centre tile for horizontal, vertical, and both diagonal win conditions
        if (Game.gameboard[4] == "X" || Game.gameboard[4] == "O"){
            //Horizontal win
            if (Game.gameboard[3] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[5]){
                console.log("WIn");
            }
            //Vertical win
            if (Game.gameboard[1] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[7]){
                console.log("Win");
            }
            //Diagonal top left to bottom right
            if (Game.gameboard[0] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[8]){
                console.log("WIn");
            }
            //Diagonal bottom left to top right
            if (Game.gameboard[2] == Game.gameboard[4] && Game.gameboard[4] == Game.gameboard[6]){
                console.log("Win");
            }
        }

        //Check top left tile for horizontal and vertical win conditions
        if (Game.gameboard[0] == "X" || Game.gameboard[0] == "O"){
            //Horizontal win
            if (Game.gameboard[0] == Game.gameboard[1] && Game.gameboard[1] == Game.gameboard[2]){
                console.log("Win");
            }
            //Vertical win
            if (Game.gameboard[0] == Game.gameboard[3] && Game.gameboard[3] == Game.gameboard[6]){
                console.log("Win");
            }
        }
        //Check bottom right tile for horizontal and vertical win conditions
        if (Game.gameboard[8] == "X" || Game.gameboard[8] == "O"){
            //Horizontal win
            if (Game.gameboard[6] == Game.gameboard[7] && Game.gameboard[7] == Game.gameboard[8]){
                console.log("WIN");
            }
            //Vertical Win
            if (Game.gameboard[2] == Game.gameboard[5] && Game.gameboard[5] == Game.gameboard[8]){
                console.log("Win");
            }
        }

    }
    buttonClicked.disabled = true;
}