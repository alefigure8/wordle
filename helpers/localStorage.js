import {entryWord} from '../main.js'
import {renderWord} from './grid.js'
let countRow = 0

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