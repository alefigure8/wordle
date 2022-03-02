
const item  = document.querySelectorAll('.item')
const title  = document.getElementById('title')
const mode = document.getElementById('mode')
const body = document.querySelector('body')
const keys = document.querySelectorAll('.keyLetter')
const send = document.getElementById('key-send')
const keyDelete = document.getElementById('key-delete')
const backSpacer = document.querySelector('.fa-backspace')
const header = document.querySelector('header')
const instruction = document.querySelector('.fa-question-circle')
const modalBG = document.getElementById('modal')
const modalInstruction = document.getElementById('modal_instruction')
const modalEndGame = document.getElementById('modal-endgame')
const one = document.querySelector(".fas");

// lee localstorage
function readLocalStorage(){
    return JSON.parse(localStorage.getItem('darkMode'))
}

// modifica estilos y guarda eleccion
function darkMode(){
    saveLocalStorage()
    styleDarkMode()
}

function saveLocalStorage(){
    const readStorage = readLocalStorage()
    readStorage === null ? localStorage.setItem('darkMode', true) : localStorage.setItem('darkMode', !readStorage)
}

//TODO arreglar storage
function styleDarkMode(){
    // body
    body.classList.toggle('dark_bg')
    item.forEach(letter => letter.classList.toggle('dark_grid'))
    title.classList.toggle('dark_font')
    keys.forEach(key => key.classList.toggle('dark_key'))
    send.classList.toggle('dark_key')
    keyDelete.classList.toggle('dark_key')
    backSpacer.classList.toggle('dark_key')
    header.classList.toggle('dark_header')
    one.classList.toggle("fa-circle");
    one.classList.toggle("fa-moon");
    one.classList.toggle("active1");
    mode.classList.toggle("changeBg");

    // instruction

    instruction.classList.toggle('dark_icon')
    modalBG.classList.toggle('modal-bg')
    modalInstruction.classList.toggle('modal_instruction_dark')

    //end game
    modalEndGame.classList.toggle('dark_font')
}


export function loadDarkMode(){
    mode.addEventListener('click', darkMode)

    // si al cargar página darkmode es true, coloca estilos
    const readStorage = readLocalStorage()
    readStorage && styleDarkMode()
}