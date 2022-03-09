import {encrypt} from './crypt.js';

// cargar palabra del JSON
export async function loadWordFetch(){
    const response = await fetch('../words/words.json');
    const result = await response.json();
    // Encriptar y guardar en local storage
    await encrypt(result.WORD[Math.floor(Math.random()*result.WORD.length)].word);
}

// carga la palabra del fetch
export async function loadWord(){
    const savedSolution = localStorage.getItem('solution');
    savedSolution !== null ? localStorage.getItem('solution') : await loadWordFetch();
}
