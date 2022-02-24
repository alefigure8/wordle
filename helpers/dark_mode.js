
const item  = document.querySelectorAll('.item')
const title  = document.getElementById('title')
const mode = document.getElementById('mode')
const modeIcon = document.querySelector('.fa-moon')
const body = document.querySelector('body')
const keys = document.querySelectorAll('.keyLetter')
const send = document.getElementById('key-send')
const keyDelete = document.getElementById('key-delete')
const header = document.querySelector('header')
const instruction = document.querySelector('.fa-question-circle')

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
    header.classList.toggle('dark_header')

    // instruction
    modeIcon.classList.toggle('dark_icon')
    instruction.classList.toggle('dark_icon')
}


export function loadDarkMode(){
    mode.addEventListener('click', darkMode)

    // si al cargar página darkmode es true, coloca estilos
    const readStorage = readLocalStorage()
    readStorage && styleDarkMode()
}