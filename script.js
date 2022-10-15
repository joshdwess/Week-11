const tiles = document.querySelectorAll(".tile");
const statusText = document.querySelector("#gameText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let strats= ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let playing = false;

initializeGame();

function initializeGame(){
    tiles.forEach(tile => tile.addEventListener("click", tileClicked));
    restartBtn.addEventListener("click", restartGame);
    gameText.textContent = `${currentPlayer}'s turn`;
    playing = true;
}
function tileClicked(){
    const tileIndex = this.getAttribute("tileIndex");

    if(strats[tileIndex] != "" || !playing){
        return;
    }

    updateTile(this, tileIndex);
    checkWinner();
}
function updateTile(tile, index){
    strats[index] = currentPlayer;
    tile.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const tileA = strats[condition[0]];
        const tileB = strats[condition[1]];
        const tileC = strats[condition[2]];

        if(tileA == "" || tileB == "" || tileC == ""){
            continue;
        }
        if(tileA == tileB && tileB == tileC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        gameText.textContent = `Close but no cigar ${currentPlayer} wins this one!`;
        playing = false;
    }
    else if(!strats.includes("")){
        gameText.textContent = `Congrats neither of you win!`;
        playing = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    strats = ["", "", "", "", "", "", "", "", ""];
    gameText.textContent = `${currentPlayer}'s turn`;
    tiles.forEach(tile => tile.textContent = "");
    playing = true;
}