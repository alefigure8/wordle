
//== VARIABLES DEL DOM ==//
const key = document.querySelectorAll('.keyLetter')
const send = document.getElementById('key-send')
const keyDelete = document.getElementById('key-delete')
const cell_0 = document.querySelectorAll('.cell_0')
const cell_1 = document.querySelectorAll('.cell_1')
const cell_2 = document.querySelectorAll('.cell_2')
const cell_3 = document.querySelectorAll('.cell_3')
const cell_4 = document.querySelectorAll('.cell_4')

// objeto con las celdas
objCell = {}
objCell[0] = cell_0
objCell[1] = cell_1
objCell[2] = cell_2
objCell[3] = cell_3
objCell[4] = cell_4

// contadores
let count = 0;
let row = 0

// array agrupando letras y palabras
let wordSelected = []
let words = []


//== LISTENER Y FUNCIONES DEL DOM ==//

// letras del teclado virtual
key.forEach(each => {
    each.addEventListener('click', e => {
        if(count < 5){
            wordSelected.push(e.target.getAttribute('letter').toUpperCase());
            if(wordSelected.length > 0){
                wordSelected.forEach(letter => {
                   objCell[row][count].innerText = letter
                })
            }
            count++
        }
    })
})


// letras del teclado físico (hacerlo con keyup para capturar delete)
document.addEventListener('keypress', e =>{

    // validación
    if(e.key!=='Enter' && e.key.match(/^[a-zA-Z]+$/)){

        //deja de escribir si la palabra es mayor a 5 letras
        if(count < 5){
            wordSelected.push(e.key.toUpperCase());
            if(wordSelected.length > 0){
                wordSelected.forEach(letter => {
                   objCell[row][count].innerText = letter
                })
            }
            count++
        }

    }

})


// tecla delete fisica
document.addEventListener('keyup', (e)=>{

    if(e.key === 'Backspace'){
        deleteKey()
    }
})


// tecla enviar virtual
send.addEventListener('click', sendWord)

function sendWord(){

    if(wordSelected.length === 5){
        words.push(wordSelected.join(''))
        wordSelected = []
        count = 0
        if(row < 5){
            row+=1
        }
    } else {
        //Advierte que no se puede mandar
        alert('No hay suficientes letras para una palabra')
    }

}

//tecla enviar física
document.addEventListener('keypress', sendWordFisicKey)

function sendWordFisicKey(e){
    if(e.key === 'Enter'){
        sendWord()
    }
}


// tecla borrar
keyDelete.addEventListener('click', deleteKey)

function deleteKey(){

    wordSelected.splice(wordSelected.length-1, 1)
    if(count > 0){
        count--
        objCell[row][count].innerText = ''
    }

}


//== FUNCIONES LOGICA ==//

// palabra ejemplo para jugar
const WORD = 'piano'

// Chances (inicia en dos porque el primer prompt es la primera chance)
let chance = 2;

// objeto contenedor de palabras elegidas por usuario
const wordObj ={}

// muestra prompt
function entryWord(){
    let userWord = prompt(`
    Wordle Clon

    Ingrese una palabra de 5 letras
    `).toLocaleLowerCase()

    // validación (letra con más de 5 palabras o números)
   while (userWord.length > 5 || !userWord.match(/^[a-zA-Z]+$/)){
        userWord = prompt('Solo puede ingresar 5 letras. Los números no están permitidos')
    }

    // Si la palabra no está en el objeta lo crea
    if(!wordObj[userWord]){

        wordObj[userWord] = {word: userWord}

        // Validación de la palabra elegida
        validateWord(userWord)

    } else {
        userWord = prompt('Ya eleigió esa palabra')
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
     while(chance < 6 && !wordObj[WORD]){

        //aumenta chance
        chance += 1
        entryWord()

    }

    // Palabra correcta, ganó
    if(wordObj[WORD]){
        alert(`Felicidades.La palabra ${WORD} es correcta`)
    }

    // Más de  5 oportunidades, perdió
    if(chance > 5){
        console.log('Perdió')
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


/*=== MODAL ===*/

const modalInstruction = document.getElementById('modal_instruction')
const instruction = document.getElementById('instruction')
const closeBTN = document.getElementById('close')
const playBTN = document.getElementById('btn_play')

// open modal instruction
instruction.addEventListener('click', openInstruction)

// open close instruction
closeBTN.addEventListener('click', closeInstruction)

// open close instruction
playBTN.addEventListener('click', closeInstruction)

function openInstruction(){
    modalInstruction.classList.add('animation-in')
    modalInstruction.classList.remove('animation-out')
    modalInstruction.classList.remove('hide')
}

function closeInstruction(){
    modalInstruction.classList.remove('animation-in')
    modalInstruction.classList.add('animation-out')
    setTimeout(() => {
        modalInstruction.classList.add('hide')
    }, 400);
}


// Listener click icono opciones

function modalConfig(){
    // Modal que abre configuracion de la página
}

//== MESSAGE ==//

const messageModal = document.getElementById('message')

function alert(message){

    messageModal.classList.remove('hide')
    messageModal.classList.add('msg-animation')
    messageModal.innerHTML= `<p>${message}</p>`

    setTimeout(() => {
    messageModal.classList.add('hide')
    messageModal.classList.remove('msg-animation')
    }, 3000);
}