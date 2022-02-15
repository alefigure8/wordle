import {objCell, renderWord} from './grid.js'
import {messageAlert} from './message.js'
import {entryWord, actualWord} from './main.js'

// variables DOM
const send = document.getElementById('key-send')
const keyDelete = document.getElementById('key-delete')
const key = document.querySelectorAll('.keyLetter')

// contadores
let count = 0;
let row = 0

// array agrupando letras y palabras
export let wordSelected = []
export let words = []

// letras del teclado virtual
key.forEach(each => {
    each.addEventListener('click', e => {
        if(count < 5){
            wordSelected.push(e.target.getAttribute('letter').toUpperCase());
            if(wordSelected.length > 0){
                wordSelected.forEach(letter => {
                    objCell[row][count].innerText = letter
                    objCell[row][count].classList.add('animate-grill')
                })
            }
            count++
        }
    })
})


function fisicKeyboard(e){
    if(e.key!=='Enter' && e.key.match(/^[a-zA-Z]+$/)){
        if(count < 5){
            wordSelected.push(e.key.toUpperCase());
            if(wordSelected.length > 0){
                wordSelected.forEach(letter => {
                    objCell[row][count].innerText = letter
                    objCell[row][count].classList.add('animate-grill')
                })
            }
            count++
        }
    }
}


function deleteKeyFisic(e){
    if(e.key === 'Backspace'){
        deleteKey()
    }
}


async function sendWord(){

    if(wordSelected.length === 5){
        if(!words.includes(wordSelected.join(''))){
            words.push(wordSelected.join(''))
            // valida palabra
           await entryWord(wordSelected.join('').toLowerCase())
            //renderizar colores await
            await renderWord(actualWord, row)
            wordSelected = []
            count = 0
            if(row < 5){
                row+=1
            }
        } else {
            messageAlert('Ya eligió la palabra')
            emptyWord()
        }
    } else {
        //Advierte que no se puede mandar
        messageAlert('No hay suficientes letras para una palabra')
    }

}



function sendWordFisicKey(e){
    if(e.key === 'Enter'){
        sendWord()
    }
}



function deleteKey(){

    wordSelected.splice(wordSelected.length-1, 1)
    if(count > 0){
        count--
        objCell[row][count].innerText = ''
        objCell[row][count].classList.remove('animate-grill')
    }

}

export function emptyWord(){
    objCell[row].forEach(cell => {
        cell.innerText = ''
        cell.classList.remove('animate-grill')
    })
    count = 0
    wordSelected = []
}

export function loadKeyboard(){
    // tecla borrar
    keyDelete.addEventListener('click', deleteKey)

    //tecla enviar física
    document.addEventListener('keypress', sendWordFisicKey)

    // tecla enviar virtual
    send.addEventListener('click', sendWord)

    // tecla delete fisica
    document.addEventListener('keyup',deleteKeyFisic)

    // letras del teclado físico (hacerlo con keyup para capturar delete)
    document.addEventListener('keypress', fisicKeyboard)
}