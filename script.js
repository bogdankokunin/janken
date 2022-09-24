const rounds = document.querySelector('.rounds');
const rolesButtons = document.querySelectorAll('.button');
const gameSituation = document.querySelector('.situation')

let myScore = 0;
let enemyScore = 0; 
let round = 0;

function countRounds() {
    round += 1;
    rounds.innerText = `回戦 : ${round}`;
    return round;
}


function getComputerChoice() {
    const roles = ['ryoushi', 'kitsune', 'shouya'];
    const computerSelection = Math.floor(Math.random() * roles.length);
    return computerSelection;
}

function oneRound(playerSelection, computerSelection) {
    switch (true) {
        case (playerSelection === computerSelection) :
            switch (true) {
                case (playerSelection === 0) :
                    gameSituation.innerText = "結果： Two hunters met with each other";
                    break;
                case (playerSelection === 1) :
                    gameSituation.innerText = "結果： Two foxes met with each other";
                    break;
                case (playerSelection === 2) :
                    gameSituation.innerText = "結果： Two masters met with each other";
                    break;
            }
            break;
        case (playerSelection !== computerSelection) :
            switch (true) {
                case ((playerSelection === 0) && (computerSelection === 1)) :
                    gameSituation.innerText = "結果： Your hunter shot his fox!";
                    myScore += 1;
                    break;
                case ((playerSelection === 1) && (computerSelection === 2)) :
                    gameSituation.innerText = "結果： Your fox juked his master!";
                    myScore += 1;
                    break;
                case ((playerSelection === 2) && (computerSelection === 0)) :
                    gameSituation.innerText = "結果： Your master made his hunter bow!";
                    myScore += 1;
                    break;
                case ((playerSelection === 0) && (computerSelection === 2)) :
                    gameSituation.innerText = "結果： His master made your hunter bow!";
                    enemyScore += 1;
                    break;
                case ((playerSelection === 1) && (computerSelection === 0)) :
                    gameSituation.innerText = "結果： His hunter shot your fox!";
                    enemyScore += 1;
                    break;
                case ((playerSelection === 2) && (computerSelection === 1)) :
                    gameSituation.innerText = "結果： His fox juked your master!";
                    enemyScore += 1;
                    break;
            }
            break;
    }
    const score1 = document.querySelector('.my-score');
    const score2 = document.querySelector('.enemy-score');
    score1.innerText = `お客様の得点 : ${myScore}`;
    score2.innerText = `敵の得点 : ${enemyScore}`;
    return [myScore, enemyScore];
}

function endGame(playerScore, computerScore) {
    if (playerScore === 3) {
        gameSituation.innerText = "You WON!";
    }
    else if (computerScore === 3) {
        gameSituation.innerText = "Enemy WON!";
    }
}


function playGame() {
    let playerSelection;
    rolesButtons.forEach((role) => {
        role.addEventListener('click', () => {
            const roleImage = document.querySelectorAll('.role-image');
            if (role.classList.contains('hunter')) {
                playerSelection = 0;
            } else if (role.classList.contains('fox')) {
                playerSelection = 1;
            } else if (role.classList.contains('master')) {
                playerSelection = 2;
            }
            countRounds();
            oneRound(playerSelection, getComputerChoice());
            endGame(myScore, enemyScore);
        });
    });
}

playGame();

