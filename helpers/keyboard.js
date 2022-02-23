import {objCell, renderWord} from './grid.js'
import {messageAlert} from './message.js'
import {entryWord} from '../main.js'

// variables DOM
const send = document.getElementById('key-send')
const keyDelete = document.getElementById('key-delete')
const key = document.querySelectorAll('.keyLetter')

// leer LocalStorage
const getLocalStorage = localStorage.getItem('board')


// array agrupando letras y palabras
export let wordSelected = []
export let words = []

// contadores
let count = 0;
let row = 0

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


// reset estilos al  teclado virtual
export function clearKeyBoard(){
    key.forEach(key => {
            key.classList.remove('yellow-key')
            key.classList.remove('green-key')
            key.classList.remove('gray-key')
    })
}


// send, teclado virtual
async function sendWord(){
    if(wordSelected.length === 5){
        if(!words.includes(wordSelected.join(''))){
            // guarda palabaras elegidas
            words.push(wordSelected.join(''))

            // valida palabra
            const actualWord = await entryWord(wordSelected.join('').toLowerCase())
            //renderizar colores await

            await renderWord(actualWord, row)

            // salva palabra en localStorage
            await saveWordLocal()

            wordSelected = []
            count = 0
            row < 5 && row++

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
    e.key === 'Enter' && sendWord()
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
    e.key === 'Backspace' && deleteKey()
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
   getLocalStorage === null ? localStorage.setItem('board', JSON.stringify(words)) : localStorage.setItem('board', JSON.stringify(words))
}

// cambiar estilos al teclado virtual según la palabra elegida
export function selectedKeys(obj){
    const keys = document.querySelectorAll('.keyLetter')
    if(obj.correct !== undefined){
        obj.correct.forEach(letter => {
                keys.forEach(key => {
                    if(key.getAttribute('letter') === letter.letter){
                        key.classList.remove('yellow-key')
                        key.classList.add('green-key')
                    }
            })
        })
    }

    if(obj.position !== undefined){
        obj.position.forEach(letter => {
            keys.forEach(key => {
                if(key.getAttribute('letter') === letter.letter){
                    key.classList.add('yellow-key')
                }
            })
        })
    }

    if(obj.wrong !== undefined){
        obj.wrong.forEach(letter => {
            keys.forEach(key => {
                key.getAttribute('letter') === letter.letter && key.classList.add('gray-key')
            })
        })
    }
}

// limpia variable de palabras anteriores
export function emptyArrayWord(){
    row = 0
    count = 0
    words = []
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