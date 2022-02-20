// variables
const cell_0 = document.querySelectorAll('.cell_0')
const cell_1 = document.querySelectorAll('.cell_1')
const cell_2 = document.querySelectorAll('.cell_2')
const cell_3 = document.querySelectorAll('.cell_3')
const cell_4 = document.querySelectorAll('.cell_4')

// objeto con las celdas
export let objCell = {}
objCell[0] = cell_0
objCell[1] = cell_1
objCell[2] = cell_2
objCell[3] = cell_3
objCell[4] = cell_4


// render colores de grilla y teclado
export async function renderWord(word, row){
    // correct
    if(word.correct !== undefined){
        word.correct.forEach(letter => {

            objCell[row][letter.index].classList.add('green-cell')
            objCell[row][letter.index].classList.add('animate-grill')
            objCell[row][letter.index].innerText = letter.letter.toUpperCase()

            const keys = document.querySelectorAll('.keyLetter')
            keys.forEach(key => {
                if(key.getAttribute('letter') === letter.letter){
                    key.classList.remove('yellow-key')
                    key.classList.add('green-key')
                }
            })

        })
    }

    // position
    if(word.position !== undefined){
        word.position.forEach(letter => {
            objCell[row][letter.index].classList.add('yellow-cell')
            objCell[row][letter.index].classList.add('animate-grill')
            objCell[row][letter.index].innerText = letter.letter.toUpperCase()

            const keys = document.querySelectorAll('.keyLetter')
            keys.forEach(key => {
                if(key.getAttribute('letter') === letter.letter){
                    key.classList.add('yellow-key')
                }
            })
        })
    }

    // wrong
    if(word.wrong !== undefined){
        word.wrong.forEach(letter => {
            objCell[row][letter.index].classList.add('gray-cell')
            objCell[row][letter.index].classList.add('animate-grill')
            objCell[row][letter.index].innerText = letter.letter.toUpperCase()

            const keys = document.querySelectorAll('.keyLetter')
            keys.forEach(key => {
                if(key.getAttribute('letter') === letter.letter){
                    key.classList.add('gray-key')
                }
            })

        })
    }

}

export function clearCells(){
    console.log(objCell)
    cell_0.forEach(cell => {
        cell.classList.remove('animate-grill')
        cell.classList.remove('green-cell')
        cell.classList.remove('yellow-cell')
        cell.classList.remove('gray-cell')
        cell.innerHTML = ''
    })
    
}

export function clearKeyBoard(){

}