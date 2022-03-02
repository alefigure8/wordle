export function leerarchivo(file)
{
    const  wordList = new XMLHttpRequest();
    wordList.open("GET", file, false);
    wordList.onreadystatechange = function ()
    {
        if(wordList.readyState === 4)
        {
            if(wordList.status === 200 || wordList.status == 0)
            {
                let newArr = []
                const texto = wordList.responseText;
                const arrayTexto = texto.split('\n')
                arrayTexto.forEach(word => {
                    const cleanWord = word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").trim()
                    newArr.push(cleanWord)
                })
                const createObj = newArr.map(each =>{
                   return { 'word': each }
                })
                return JSON.stringify(createObj)

            }
        }
    }
    wordList.send(null);

}

// return console.log(arrayTexto.map(each => {
//     return JSON.stringify({word: each})
// }))