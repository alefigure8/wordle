import {objCell, renderWord} from './grid.js'
import {messageAlert} from './message.js'
import {entryWord} from '../main.js'

// variables DOM
const send = document.getElementById('key-send')
const keyDelete = document.getElementById('key-delete')
const key = document.querySelectorAll('.keyLetter')

// leer LocalStorage
const getLocalStorage = localStorage.getItem('board')

// contadores
let count = 0;
let row = 0

// array agrupando letras y palabras
export let wordSelected = []
export let words = []

// Modifica words y row si hay algo en el local storage
if(getLocalStorage !== null){
    row = JSON.parse(getLocalStorage).length
    words = [...JSON.parse(getLocalStorage)]
}


// letras del teclado virtual
export function virtualKeyboard(){
        key.forEach(each => {
            each.addEventListener('click', e => {
                if(count < 5 && row < 5){
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
}

// letras del teclado fisico
function fisicKeyboard(e){
    if(row < 5){
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
}


// send, teclado virtual
async function sendWord(){
    if(wordSelected.length === 5){
        if(!words.includes(wordSelected.join(''))){
            words.push(wordSelected.join(''))

            // valida palabra
            const actualWord = await entryWord(wordSelected.join('').toLowerCase())
            //renderizar colores await

            await renderWord(actualWord, row)

            // salva palabra en localStorage
            await saveWordLocal()

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


// enter, teclado fisico
function sendWordFisicKey(e){
    if(e.key === 'Enter'){
        sendWord()
    }
}


// delete teclado virtual
function deleteKey(){
    wordSelected.splice(wordSelected.length-1, 1)
    if(count > 0){
        count--
        objCell[row][count].innerText = ''
        objCell[row][count].classList.remove('animate-grill')
    }
}

// delete teclado fisico
function deleteKeyFisic(e){
    if(e.key === 'Backspace'){
        deleteKey()
    }
}

// vaciar celdas si la palabra ya está elegida
export function emptyWord(){
    objCell[row].forEach(cell => {
        cell.innerText = ''
        cell.classList.remove('animate-grill')
    })
    count = 0
    wordSelected = []
}

// guardar palabras en el local storage
function saveWordLocal(){

    if(getLocalStorage === null){
        localStorage.setItem('board', JSON.stringify(words))
    } else {
        localStorage.setItem('board', JSON.stringify(words))
    }

}

export function loadKeyboard(){

    // teclas virtuales
    virtualKeyboard()

    // tecla borrar virtual
    keyDelete.addEventListener('click', deleteKey)

    // tecla enviar física
    document.addEventListener('keypress', sendWordFisicKey)

    // tecla enviar virtual
    send.addEventListener('click', sendWord)

    // tecla delete fisica
    document.addEventListener('keyup',deleteKeyFisic)

    // teclas "enter" y "delete"
    document.addEventListener('keypress', fisicKeyboard)
 
}