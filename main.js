import {loadModal, endGame} from './helpers/modal.js'
import {messageAlert} from './helpers/message.js'
import {loadDarkMode} from './helpers/dark_mode.js'
import {loadKeyboard} from './helpers/keyboard.js'
import {readLocalStorage} from './helpers/localStorage.js'
import {loadWord} from './helpers/fetch.js'


// loaded
document.addEventListener('DOMContentLoaded', () => {
    loadModal()
    loadDarkMode()
    readLocalStorage()
    loadKeyboard()
})

console.log('Hola')

// oportunidades
let chance = 1;

// objeto contenedor de palabras elegidas por usuario
const wordObj ={}


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

            if(wordObj[word].correct === undefined){
                // crear array
                wordObj[word].correct = [{letter: splitUserWord[i], index: i}]
            } else {
                // concatena con array existente
                wordObj[word].correct = [...wordObj[word].correct, {letter: splitUserWord[i], index: i}]
            }

        } else if (indexWord !== -1){

            // Letra correcta, pero no su posición

            if(wordObj[word].position === undefined){
                wordObj[word].position = [{letter: splitUserWord[i], index: i}]
            } else {
                wordObj[word].position = [...wordObj[word].position, {letter: splitUserWord[i], index: i}]
            }

        } else {

            // letra incorrecta

             if(wordObj[word].wrong === undefined){
                wordObj[word].wrong = [{letter: splitUserWord[i], index: i}]
            } else {
                wordObj[word].wrong = [...wordObj[word].wrong, {letter: splitUserWord[i], index: i}]
            }
        }
    }

    // validación
    if(chance < 6 && !Object.keys(wordObj).includes(WORD)){
        chance += 1
    } else {
        validateGame(wordObj[word], WORD)
    }

    // guardar palabra actual con sus detalles
    return wordObj[word]
}


function validateGame(userWord, WORD){

    // Palabra correcta, ganó
    if(chance < 6 && userWord.word === WORD){

        // mostrar resultados
        endGame(wordObj)

        // TODO localstorage que guarde las partidas seguidas que se van ganando

        // TODO deshabilitar teclado
    }

    if(chance > 6 && !userWord.word === WORD) {
        messageAlert('Perdió')
        endGame(wordObj)
    }
}