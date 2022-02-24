
export function initTime(){
    const init = luxon.DateTime.now().toString()
    const arrayWord = localStorage.getItem('board')

    if(localStorage.getItem('initTime') === null || arrayWord === null){
        localStorage.setItem('initTime', init)
    }
}

export function endTime(){
    const final = luxon.DateTime.now().toString()

    if(localStorage.getItem('finalTime') === null){
        localStorage.setItem('finalTime', final)
    }
}

export function calculateTime(){
    const init = localStorage.getItem('initTime')
    const final = localStorage.getItem('finalTime')
    const date1 = luxon.DateTime.fromISO(init)
    const date2 = luxon.DateTime.fromISO(final)
    // calcula diferencia entre tiempo inicial y tiempo final
    const diff = date2.diff(date1, ["years", "months", "days", "hours", "minutes", "seconds"])
    return {days: diff.values.days, hours: diff.values.hours, minutes: diff.values.minutes, seconds: diff.values.seconds}
}

export function clearTimeout(){
    initTime()
    localStorage.removeItem('finalTime')
}