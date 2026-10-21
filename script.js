function Gameboard(name1, name2){
    const player1 = name1;
    const player2 = name2;

    let x_playing = true;

    //Returns true if it is crosses turn, false if noughts
    const getPlayer = () => x_playing;

    //Flips which players turn it is
    const switchPlayer = () => {x_playing = !x_playing};

    const gameboard = ['-','-','-','-','-','-','-','-','-'];

    return {getPlayer, switchPlayer, gameboard};
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
    } else {
        buttonClicked.textContent = "O";
        Game.gameboard[buttonPos] = "O";
        Game.switchPlayer();
    }
    buttonClicked.disabled = true;
    console.log(Game.gameboard);
}