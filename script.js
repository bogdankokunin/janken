let myScore = 0;
let enemyScore = 0; 
let round = 0;

const rounds = document.querySelector('.rounds');
const rolesButtons = document.querySelectorAll('.button');
const gameSituation = document.querySelector('.situation');
const enemyImage = document.querySelector('.enemy-role-img');
const main = document.querySelector('main');

const restartButtonContainer = document.createElement('div');
const restartButton = document.createElement('button');

function countRounds() {
    round += 1;
    rounds.innerText = `回戦 : ${round}`;
    return round;
}


function buttonFunc() {
    restartButtonContainer.setAttribute('class', 'restartButtonContainer');
    restartButton.setAttribute('class', "restartButton");
    restartButton.textContent = 'リスタート'
    restartButtonContainer.appendChild(restartButton);
    main.appendChild(restartButtonContainer);
}

function getComputerChoice() {
    const roles = ['ryoushi', 'kitsune', 'shouya'];
    const computerSelection = Math.floor(Math.random() * roles.length);
    return computerSelection;
}

function oneRound(playerSelection, computerSelection) {

    switch (true) {
        case (computerSelection === 0) :
            enemyImage.setAttribute('src', "./resources/ryoushi.svg");
            enemyImage.setAttribute('width', "80");
            break;
        case (computerSelection === 1) :
            enemyImage.setAttribute('src', "./resources/kitsune.svg");
            enemyImage.setAttribute('width', "155");
            break;
        case (computerSelection === 2) :
            enemyImage.setAttribute('src', "./resources/shouya.svg");
            enemyImage.setAttribute('width', "130");
            break;
    }
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
    return;
}

function endGame(playerScore, computerScore) {
    if (playerScore === 3) {
        gameSituation.setAttribute('class', "winner");
        gameSituation.innerText = '結果：お客様の勝利';
        buttonFunc();
        rolesButtons.forEach((role) => role.disabled = true);    
    }
    else if (computerScore === 3) {
        gameSituation.setAttribute('class', "winner");
        gameSituation.innerText = '結果：敵の勝利!';
        buttonFunc();
        rolesButtons.forEach((role) => role.disabled = true);
    }
    restartButton.addEventListener('click', () => window.location.reload());

}


function playGame() {
    let playerSelection;
    rolesButtons.forEach((role) => {
        role.addEventListener('click', () => {
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
            return
        });
    });
}

playGame();

