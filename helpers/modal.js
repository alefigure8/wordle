// librerias
import { decrypt } from './crypt.js';
import {calculateTime} from './timer.js'

// Variables
const modalInstruction = document.getElementById('modal_instruction');
const instruction = document.getElementById('instruction');
const closeBTN = document.getElementById('close');
const closeEndGameBTN = document.getElementById('close-endgame');
const playBTN = document.getElementById('btn_play');
const modal = document.getElementById('modal');
const yellowLetter = document.getElementById('yellow');
const greenLetter = document.getElementById('green');
const grayLetter = document.getElementById('gray');
const resultGrid = document.querySelectorAll('.result-grid');
const modalEndgame = document.getElementById('modal-endgame');
const dist_number = document.querySelectorAll('.dist');
const linesPlay = document.getElementById('lines');
const solution = document.getElementById('solution')


// == MODAL INSTRUCTION == //

function openInstruction(){
    modalInstruction.classList.add('animation-in');
    modalInstruction.classList.remove('animation-out');
    modalInstruction.classList.remove('hide');
    modal.classList.remove('hide');

    setTimeout(() => {
        greenLetter.classList.add('flip-animation');
    }, 200);

    setTimeout(() => {
        yellowLetter.classList.add('flip-animation');
    }, 500);

    setTimeout(() => {
        grayLetter.classList.add('flip-animation');
    }, 800);
}


export function closeInstruction(){
    modalInstruction.classList.remove('animation-in');
    modalInstruction.classList.add('animation-out');
    modal.classList.add('hide')

    setTimeout(() => {
        modalInstruction.classList.add('hide');
        modalEndgame.classList.add('hide');
        yellowLetter.classList.remove('flip-animation');
        greenLetter.classList.remove('flip-animation');
        grayLetter.classList.remove('flip-animation');
    }, 400);
}

export function closeEndGame (){
    modalEndgame.classList.remove('animation-in');
    modalEndgame.classList.add('animation-out');

    setTimeout(() => {
        modal.classList.add('hide');
        modalEndgame.classList.add('hide');
    }, 400);
}


export function loadModal(){
        // open modal instruction
        instruction.addEventListener('click', openInstruction);

        // close instruction
        closeBTN.addEventListener('click', closeInstruction);

        closeEndGameBTN.addEventListener('click', closeEndGame);

        // close instruction
        playBTN.addEventListener('click', closeInstruction);

        // close instruction
        modal.addEventListener('click', closeInstruction);

        modal.addEventListener('click', closeEndGame);
}



//=== MODAL FINAL ===//
export async function endGame(wordObj){
    // show modal
    modalEndgame.classList.add('animation-in');
    modalEndgame.classList.remove('animation-out');
    modalEndgame.classList.remove('hide');
    modal.classList.remove('hide');

    // guarda celdas creadas
    let sortCell0 = [];
    let sortCell1 = [];
    let sortCell2 = [];
    let sortCell3 = [];
    let sortCell4 = [];

    // result-grid
    const [cell_0, cell_1, cell_2, cell_3, cell_4] = resultGrid;

    //clean dom
    resultGrid.forEach(cell => {
         cell.innerHTML = '';
    })

    // render celdas de resultados
    Object.values(wordObj).forEach((word, i) => {

        const {correct, wrong, position} = word;

        if(correct !== undefined){
            correct.forEach(correctWord => {
                if(cell_0.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('green-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', correctWord.index);
                    sortCell0.push(divCell);
                };

                if(cell_1.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('green-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', correctWord.index);
                    sortCell1.push(divCell);
                };

                if(cell_2.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('green-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', correctWord.index);
                    sortCell2.push(divCell);
                };

                if(cell_3.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('green-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', correctWord.index);
                    sortCell3.push(divCell);
                };

                if(cell_4.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('green-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', correctWord.index);
                    sortCell4.push(divCell);
                };
            });
        };

        if(position !== undefined){
            position.forEach(positionWord => {
                if(cell_0.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('yellow-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', positionWord.index);
                    sortCell0.push(divCell);
                };

                if(cell_1.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('yellow-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', positionWord.index);
                    sortCell1.push(divCell);
                };

                if(cell_2.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('yellow-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', positionWord.index);
                    sortCell2.push(divCell);
                };

                if(cell_3.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('yellow-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', positionWord.index);
                    sortCell3.push(divCell);
                };

                if(cell_4.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('yellow-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', positionWord.index);
                    sortCell4.push(divCell);
                };
            });
        };

        if(wrong !== undefined){
            wrong.forEach(wrongWord => {
                if(cell_0.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('gray-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', wrongWord.index);
                    sortCell0.push(divCell);
                };

                if(cell_1.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('gray-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', wrongWord.index);
                    sortCell1.push(divCell);
                };

                if(cell_2.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('gray-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', wrongWord.index);
                    sortCell2.push(divCell);
                };

                if(cell_3.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('gray-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', wrongWord.index);
                    sortCell3.push(divCell);
                };

                if(cell_4.getAttribute('id') == i){
                    const divCell = document.createElement('div');
                    divCell.classList.add('gray-cell');
                    divCell.classList.add('result-cell');
                    divCell.setAttribute('id', wrongWord.index);
                    sortCell4.push(divCell);
                };
            });
        }


        // Ordenar cada celda segun ID
        sortCell0.sort((a,b) => {
            return a.getAttribute('id') - b.getAttribute('id');
        });

        sortCell1.sort((a,b) => {
            return a.getAttribute('id') - b.getAttribute('id');
        });

        sortCell2.sort((a,b) => {;
            return a.getAttribute('id') - b.getAttribute('id');
        });

        sortCell3.sort((a,b) => {
            return a.getAttribute('id') - b.getAttribute('id');
        });

        sortCell4.sort((a,b) => {;
            return a.getAttribute('id') - b.getAttribute('id');
        });


        // append cells in DOM
        sortCell0.forEach(cell => cell_0.appendChild(cell));
        sortCell1.forEach(cell => cell_1.appendChild(cell));
        sortCell2.forEach(cell => cell_2.appendChild(cell));
        sortCell3.forEach(cell => cell_3.appendChild(cell));
        sortCell4.forEach(cell => cell_4.appendChild(cell));
    })

     // filtrando cntidad de aciertos por fila
     const dist_0_percent = sortCell0.filter(cell => cell.classList[0] == 'green-cell').length;
     const dist_1_percent = sortCell1.filter(cell => cell.classList[0] == 'green-cell').length;
     const dist_2_percent = sortCell2.filter(cell => cell.classList[0] == 'green-cell').length;
     const dist_3_percent = sortCell3.filter(cell => cell.classList[0] == 'green-cell').length;
     const dist_4_percent = sortCell4.filter(cell => cell.classList[0] == 'green-cell').length;


     // render aciertos en distribucion
     const [dist_0_number, dist_1_number, dist_2_number, dist_3_number, dist_4_number] = dist_number;

     dist_0_number.innerHTML = `${squareCells(dist_0_percent * 2)} (${dist_0_percent * 20}%)`;
     dist_1_number.innerHTML = `${squareCells(dist_1_percent * 2)} (${dist_1_percent * 20}%)`;
     dist_2_number.innerHTML = `${squareCells(dist_2_percent * 2)} (${dist_2_percent * 20}%)`;
     dist_3_number.innerHTML = `${squareCells(dist_3_percent * 2)} (${dist_3_percent * 20}%)`;
     dist_4_number.innerHTML = `${squareCells(dist_4_percent * 2)} (${dist_4_percent * 20}%)`;

     //solution
     finalSolution();

     // Timer
     timer();
;
     // points game
     wonGames();

    // porcentajes
     percent();

    //lineas jugadas
    lines(wordObj);
}

// renderiza el tiempo transcurrido en el modal final
function timer(){
    const numbTime = calculateTime();
    const numberTimeDom = document.getElementById('numbertime');
    const { hours, minutes, seconds } = numbTime;
    numberTimeDom.innerHTML= `${hours > 0 ? hours < 10 ? `0${hours}` : hours : '00'}:${minutes > 0 ? minutes < 10 ? `0${minutes}` : minutes : '00'}:${seconds > 0 ? seconds < 10 ? `0${seconds.toFixed(2)}`: seconds.toFixed(2) : '00'}`;
}

// renderiza los puntos en el modal final
function wonGames(){
    const localWonGames = localStorage.getItem('wonGames');
    const localLooseGames = localStorage.getItem('looseGames');
    const winsDom = document.getElementById('wins');
    const loosesDom = document.getElementById('loose');
    winsDom.innerHTML = localWonGames;
    loosesDom.innerHTML = localLooseGames;
}

// renderiza porcentaje en el modal final
function percent(){
    const localWonGames = localStorage.getItem('wonGames');
    const localLooseGames = localStorage.getItem('looseGames');
    const victory = document.getElementById('victory');

    const totalGames = Number(localWonGames) + Number(localLooseGames);
    const percentWins = (Number(localWonGames) * 100) / totalGames;
    victory.innerHTML = `${String(percentWins.toFixed(0))}%`;
}

// cuadrados de distribuci??n
function squareCells (numb){
    const squares = [];
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));
   const square =  `<div class="square-result ${darkMode && "squaresBG"}"></div>`;
   for (let i = 1; i <= numb; i++){;
       squares.push(square);
   };
   return squares.join('');
}

function lines(wordsObj){
    const linesLength = Object.keys(wordsObj).length;
    linesPlay.innerText = linesLength;
}

async function finalSolution(){
    // desencripta la soluci??n
    const solutionWord = await localStorage.getItem('solution');
    const WORD = await decrypt(solutionWord);
    solution.innerText = WORD.toUpperCase();
}