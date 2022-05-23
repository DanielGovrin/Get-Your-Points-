'use strict';


///Seliction
const player0Score = document.getElementById('score--0');
const player0Name = document.getElementById('name--0');
const player1Score = document.getElementById('score--1');
const player1Name = document.getElementById('name--1');


const diceImage = document.querySelector('.dice');


const rollDiceButton = document.querySelector('.btn--roll');
const newGameButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');


let playerTurn=0, current=0, playersScore = [0,0], playing = true;

player1Score.textContent = 0;
player0Score.textContent = 0;
diceImage.classList.add('hidden');


function switchPlayer(){
document.getElementById(`current--${playerTurn}`).textContent=0;
playerTurn = (playerTurn+1)%2;
document.querySelector(`.player--1`).classList.toggle('player--active');
document.querySelector(`.player--0`).classList.toggle('player--active');
current=0;
}



function rollTheDice(){
    if(playing){
    diceImage.classList.remove('hidden');
    let score = Math.trunc(Math.random()*6)+1;
    diceImage.src = `dice-${score}.png`

    if(score!=1){
        current+=score;
        document.getElementById(`current--${playerTurn}`).textContent=+current;
    }
    else{
        switchPlayer();
    }
    }   
}

function holdResult(){
    if(playing){
    playersScore[`${playerTurn}`]+=current;
    document.getElementById(`score--${playerTurn}`).textContent=playersScore[`${playerTurn}`];
    document.getElementById(`current--${playerTurn}`).textContent=0;
    current=0;
    if(playersScore[`${playerTurn}`]>=20)
        playerWin();
    else{
    switchPlayer();
    }
    }
}

function playerWin(){
    playing=false;
    document.querySelector(`.player--${playerTurn}`).classList.add('player--winner');
    document.querySelector(`.player--${playerTurn}`).classList.add('.player--winner..name');
    document.querySelector(`.player--${playerTurn}`).classList.remove('player--active');
    diceImage.classList.add('hidden');

}


function startNewGame(){
    player0Score.textContent = 0;
    player1Score.textContent = 0;
    playersScore[0]=0;
    playersScore[1]=0;
    playing=true;
    diceImage.classList.remove('hidden');
    document.querySelector(`.player--${playerTurn}`).classList.remove('player--winner');
    document.querySelector(`.player--${playerTurn}`).classList.remove('.player--winner..name');
    if(!(document.querySelector(`.player--0`).classList.contains('player--active'))){
        document.querySelector(`.player--1`).classList.remove('player--active');
        document.querySelector(`.player--0`).classList.add('player--active')
}

}



rollDiceButton.addEventListener('click', rollTheDice);
holdButton.addEventListener('click', holdResult);
newGameButton.addEventListener('click', startNewGame);