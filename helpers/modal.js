
const modalInstruction = document.getElementById('modal_instruction')
const instruction = document.getElementById('instruction')
const closeBTN = document.getElementById('close')
const playBTN = document.getElementById('btn_play')
const modal = document.getElementById('modal')
const yellowLetter = document.getElementById('yellow')
const greenLetter = document.getElementById('green')
const grayLetter = document.getElementById('gray')
const resultGrid = document.getElementById('result-grid')
const modalEndgame = document.getElementById('modal-endgame')


// == INSTRUCTION == //
function openInstruction(){
    modalInstruction.classList.add('animation-in')
    modalInstruction.classList.remove('animation-out')
    modalInstruction.classList.remove('hide')
    modal.classList.remove('hide')

    setTimeout(() => {
        greenLetter.classList.add('flip-animation')
    }, 200);

    setTimeout(() => {
        yellowLetter.classList.add('flip-animation')
    }, 500);

    setTimeout(() => {
        grayLetter.classList.add('flip-animation')
    }, 800);
}


function closeInstruction(){
    modalInstruction.classList.remove('animation-in')
    modalInstruction.classList.add('animation-out')
    modal.classList.add('hide')
    setTimeout(() => {
        modalInstruction.classList.add('hide')
        yellowLetter.classList.remove('flip-animation')
        greenLetter.classList.remove('flip-animation')
        grayLetter.classList.remove('flip-animation')
    }, 400);
}


export function loadModal(){
        // open modal instruction
        instruction.addEventListener('click', openInstruction)

        // close instruction
        closeBTN.addEventListener('click', closeInstruction)

        // close instruction
        playBTN.addEventListener('click', closeInstruction)

        // close instruction
        modal.addEventListener('click', closeInstruction)
}


//=== FINAL MODAL ===//


// TODO muestra resultado final en ventana MODAL
export function endGame(wordObj){
    // console.log(modalEndgame)
    // for(let i = 0; i < Object.keys(wordObj).length; i++){

    //     const divResult = document.createElement('div')
    //     divResult.classList.add('result-grid')
    //     divResult.innerHTML = `
    //     <div class="result-cell"></div>
    //     <div class="result-cell"></div>
    //     <div class="result-cell"></div>
    //     <div class="result-cell"></div>
    //     <div class="result-cell"></div>
    //     `
    //     const resultCell = document.querySelectorAll('.result-cell')
    //     resultCell.forEach((cell, i) => {
    //         console.log(Object.values(wordObj)[i].correct[i])
    //     })
    //     modalEndgame.appendChild(divResult)
    // }

}

// .forEach(cell => {
//     const div = document.createElement('div')
//     div.classList.add('result-cell')
//     div.classList.add('green-cell')
//     resultGrid.appendChild(div) })