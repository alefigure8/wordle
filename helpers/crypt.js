// secret (guardar como variable de entorno)
export const SECRET = 'alagrandelepusecuca'

// encripta la palabra con Crypto y la guarda en el local storage
export async function encrypt(word){
    var encrypted = await CryptoJS.AES.encrypt(word, SECRET);
    localStorage.getItem('solution') === null && localStorage.setItem('solution', encrypted)
}

// desencripta la solición con crypto
export async function decrypt(crypt){
    var decrypted = await CryptoJS.AES.decrypt(crypt, SECRET);
    return decrypted.toString(CryptoJS.enc.Utf8)
}

// limpia la solución del local storage
export function cleanSolution(){
    localStorage.getItem('solution') !== null && localStorage.removeItem('solution')
}