import {loadModal} from './modal.js'
import {messageAlert} from './message.js'
import {loadDarkMode} from './dark_mode.js'
import {loadKeyboard, wordSelected, words} from './keyboard.js'


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
let chance = 2;

// objeto contenedor de palabras elegidas por usuario
const wordObj ={}

// muestra prompt
export function entryWord(userWord){
    // Si la palabra no está en el objeta lo crea
    if(!wordObj[userWord]){

        wordObj[userWord] = {word: userWord}

        // Validación de la palabra elegida
        console.log(chance)
        validateWord(userWord)

    } else {
        userWord = messageAlert('Ya eleigió esa palabra')
    }

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
                wordObj[word].correct = [splitUserWord[i]]
            } else {
                // concatena con array existente
                wordObj[word].correct = [...wordObj[word].correct, splitUserWord[i]]
            }

        } else if (indexWord !== -1){

            // Letra correcta, pero no su posición

            if(wordObj[word].position === undefined){
                wordObj[word].position = [splitUserWord[i]]
            } else {
                wordObj[word].position = [...wordObj[word].position, splitUserWord[i]]
            }

        } else {

            // letra incorrecta

             if(wordObj[word].wrong === undefined){
                wordObj[word].wrong = [splitUserWord[i]]
            } else {
                wordObj[word].wrong = [...wordObj[word].wrong, splitUserWord[i]]
            }
        }
    }

    // Mostrar resultado en pantalla
    showResult()

    // Si las chances son menor a 5 y la palabra no es correcta, vuelve a preguntar
    //  while(chance < 6 && !wordObj[WORD] || words.length < 6){

    //     //aumenta chance
    //     chance += 1

    //     // TODO VALIDAR BIEN ESTE WHILE
    // }

    // Palabra correcta, ganó
    if(wordObj[WORD]){
        messageAlert(`Felicidades.La palabra ${WORD} es correcta`)
    }

    // Más de  5 oportunidades, perdió
    if(chance > 5){
        messageAlert('Perdió')
        endGame()
    }
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