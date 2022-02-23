import {entryWord} from '../main.js'
import {renderWord} from './grid.js'
import {closeEndGame} from './modal.js'
import {clearCells} from './grid.js'
import {clearKeyBoard, emptyArrayWord} from './keyboard.js'
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

//borrar localStorage de palabras

btn_play_again.addEventListener('click', () => {

    const localStorageArray = localStorage.getItem('board')
    localStorageArray !== null && localStorage.removeItem('board')

    closeEndGame()
    clearCells()
    clearKeyBoard()
    emptyArrayWord()
})