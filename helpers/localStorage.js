import {entryWord} from '../main.js'
import {renderWord} from './grid.js'
let countRow = 0

// Lee local Storage y renderiza palabras guardadas
export function readLocalStorage(){
    const getLocalStorage = localStorage.getItem('board')
    if(getLocalStorage !== null){

        JSON.parse(getLocalStorage).forEach( words => {
            renderLocalStorage(words, countRow)
            countRow++
        })
    }
}

async function renderLocalStorage(word, countRow){
    // valida palabra
   const localWord = await entryWord(word.toLowerCase())
  await renderWord(localWord, countRow)
}