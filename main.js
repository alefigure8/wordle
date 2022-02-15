import {loadModal} from './modal.js'
import {messageAlert} from './message.js'
import {loadDarkMode} from './dark_mode.js'
import {loadKeyboard} from './keyboard.js'


// loaded
document.addEventListener('DOMContentLoaded', () => {
    loadModal()
    loadDarkMode()
    loadKeyboard()
})

//== FUNCIONES LOGICA ==//

// palabra ejemplo para jugar
const WORD = 'piano'

// Chances (inicia en dos porque el primer prompt es la primera chance)
let chance = 1;

// objeto contenedor de palabras elegidas por usuario
const wordObj ={}
export let actualWord = {}

// muestra prompt
export function entryWord(userWord){

    // coloca palabra en el objeto
    wordObj[userWord] = {word: userWord}

    // Validación de la palabra elegida
    console.log(chance)
    validateWord(userWord)
}

// TODO, pensar en dividir función
function validateWord(word){

    // separación de la palabra elegida
    const splitUserWord = word.split('')

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

    // Mostrar resultado en pantalla
    showResult()

    if(chance < 6 && !Object.keys(wordObj).includes(WORD)){
        //aumenta chance
        chance += 1
    }

    // Más de  5 oportunidades, perdió
    if(chance > 5){
        messageAlert('Perdió')
        endGame()
    }

    // Palabra correcta, ganó
    if(wordObj[WORD]){
        messageAlert(`Felicidades.La palabra ${WORD} es correcta`)
        // TODO deshabilitar teclados
    }

    // guardar palabra actual con sus detalles
    actualWord = wordObj[word]
}

// muestra palabras en pantalla
function showResult(){

    for (let i in wordObj){
        console.log(`
        Palabra: ${wordObj[i].word }
        Letras correctas: ${wordObj[i].correct?.join(', ')}
        Posicion incorrecta: ${wordObj[i].position?.join(', ')}
        Letras incorrectas: ${wordObj[i].wrong?.join(', ')}
        `)
    }

}

// muestra resultado final
function endGame(){
    for (let i in wordObj){
        console.log(`Palabras usadas: ${wordObj[i].word}`)
    }
}

//Inicia juego
//entryWord()