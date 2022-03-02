import {entryWord} from '../main.js'
import {renderWord} from './grid.js'
import {closeEndGame} from './modal.js'
import {clearCells} from './grid.js'
import {clearKeyBoard, emptyArrayWord} from './keyboard.js'
import {clearTimeout} from './timer.js'
import {cleanSolution} from './crypt.js'
import {loadWord} from './fetch.js'

let countRow = 0

const btn_play_again = document.getElementById('btn_play_again')

// Lee local Storage
export function readLocalStorage(){
    const getLocalStorage = localStorage.getItem('board')
    if(getLocalStorage !== null){
        JSON.parse(getLocalStorage).forEach( words => {
            renderLocalStorage(words, countRow)
            countRow++
        })
    }
}

// coloca las palabras del local storage en pantalla
async function renderLocalStorage(word, countRow){
    const localWord = await entryWord(word.toLowerCase())
    await renderWord(localWord, countRow)
}

// suma puntos en partidas ganadas o perdidas
export function points(value){

    const finalTime = localStorage.getItem('finalTime')
    const wonGames =  localStorage.getItem('wonGames')
    const looseGames =  localStorage.getItem('looseGames')

    if(value) {
        // si existe en el local y el tiempo no finalizo, suma punto
        if(wonGames !== null && finalTime === null){
            localStorage.setItem('wonGames', Number(wonGames) + 1)
        } else if (wonGames !== null && finalTime !== null){ // si existe y el tiempo finalizo, no suma
            localStorage.getItem('wonGames')
        } else { // si no no existe, lo crea
            localStorage.setItem('wonGames', 1)
            looseGames === null && localStorage.setItem('looseGames', 0)
        }

    } else {

         if(looseGames !== null && finalTime === null){
            localStorage.setItem('looseGames', Number(looseGames) + 1)
        } else if(looseGames !== null && finalTime !== null) { // si existe y el tiempo finalizo, no suma
            localStorage.getItem('looseGames')
        } else { // si no no existe, lo crea
            localStorage.setItem('looseGames', 1)
            wonGames === null && localStorage.setItem('wonGames', 0)
        }

    }

}

// remueve array de palabras guardadas en el local storage
function removeWords(){
    const localStorageArray = localStorage.getItem('board')
    localStorageArray !== null && localStorage.removeItem('board')
}

// botón reiniciar juego. Limpia los datos guardados de la partida anterior
btn_play_again.addEventListener('click', () => {

    removeWords()
    closeEndGame()
    clearCells()
    clearKeyBoard()
    emptyArrayWord()
    clearTimeout()
    cleanSolution()
    loadWord()
})