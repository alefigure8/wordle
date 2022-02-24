import {loadModal, endGame} from './helpers/modal.js'
import {loadDarkMode} from './helpers/dark_mode.js'
import {loadKeyboard} from './helpers/keyboard.js'
import {readLocalStorage, points} from './helpers/localStorage.js'
import {loadWord} from './helpers/fetch.js'
import {initTime, endTime} from './helpers/timer.js'

// loaded
document.addEventListener('DOMContentLoaded', () => {
    loadModal()
    loadDarkMode()
    readLocalStorage()
    loadKeyboard()
    initTime()
})

// oportunidades
let chance = 1;

// objeto contenedor de palabras elegidas por usuario
let wordObj ={}


// guarda palabra en objeto
export function entryWord(userWord){

    // coloca palabra en el objeto
    wordObj[userWord] = {word: userWord}

    // Validación de la palabra elegida
    return validateWord(userWord)
}


// TODO, pensar en dividir función
async function validateWord(word){

    // separación de la palabra elegida
    const splitUserWord = word.split('')

    // carga solución desde fectch
    const WORD = await loadWord()

    // separación de la palabra correcta
    const splitWord = WORD.split('')

    // buscar letras de la palabra elegida en la palabra correcta
    for(let i in splitUserWord){

        // busca letras de la palbra elegida por usuario en la palabra correcta
        const indexWord = splitWord.indexOf(splitUserWord[i])

        // Si la letra y la posición coinciden
        if(indexWord !== -1 && splitUserWord[i] === splitWord[i]) {

            wordObj[word].correct === undefined
                ?
                // crear array
                wordObj[word].correct = [{letter: splitUserWord[i], index: i}]
                :
                // concatena con array existente
                wordObj[word].correct = [...wordObj[word].correct, {letter: splitUserWord[i], index: i}]

        } else if (indexWord !== -1){

            // Letra correcta, pero no su posición
            wordObj[word].position === undefined
                ?
                wordObj[word].position = [{letter: splitUserWord[i], index: i}]
                :
                wordObj[word].position = [...wordObj[word].position, {letter: splitUserWord[i], index: i}]

        } else {

            // letra incorrecta
            wordObj[word].wrong === undefined
                ?
                wordObj[word].wrong = [{letter: splitUserWord[i], index: i}]
                :
                wordObj[word].wrong = [...wordObj[word].wrong, {letter: splitUserWord[i], index: i}]

        }
    }

    // validación
    if(chance < 6 && !Object.keys(wordObj).includes(WORD)) {
        chance += 1
        validateGame(wordObj[word], WORD)
    } else {
        validateGame(wordObj[word], WORD)
    }

    // guardar palabra actual con sus detalles
    return wordObj[word]
}


async function validateGame(userWord, WORD){

    // Palabra correcta, ganó
    if (chance < 6 && userWord.word === WORD){
        const newWordObj = JSON.parse(JSON.stringify(wordObj))
        await points(true)
        endTime()
        await endGame(newWordObj)
        chance = 1
        wordObj = {}
    }

    // Perdió
    if (chance > 5 ){
        const newWordObj = JSON.parse(JSON.stringify(wordObj))
        await points(false)
        endTime()
        await endGame(newWordObj)
        chance = 1
        wordObj = {}
    }
}