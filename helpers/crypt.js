// secret (guardar como variable de entorno)
export const SECRET = 'alagrandelepusecuca'

export async function encrypt(word){
    var encrypted = await CryptoJS.AES.encrypt(word, SECRET);
    localStorage.getItem('solution') === null && localStorage.setItem('solution', encrypted)
}

export async function decrypt(crypt){
    var decrypted = await CryptoJS.AES.decrypt(crypt, SECRET);
    return decrypted.toString(CryptoJS.enc.Utf8)
}

export function cleanSolution(){
    localStorage.getItem('solution') !== null && localStorage.removeItem('solution')
}