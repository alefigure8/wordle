const readStorage = JSON.parse(localStorage.getItem('darkMode'))
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

// modifica estilos y guarda eleccion
function darkMode(){
    styleDarkMode()
    saveLocalStorage()
}

function saveLocalStorage(){
    // guarda en localStorage
    if(readStorage == null){
        localStorage.setItem('darkMode', true)
    } else {
        localStorage.setItem('darkMode', !readStorage)
    }
}

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

    if(readStorage) {
        styleDarkMode()
    }

}