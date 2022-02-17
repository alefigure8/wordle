// cargar palabra del JSON
export async function loadWord(){
    const response = await fetch('./word.json')
    const result = await response.json()
    return result.word
}