export default function pomodoroCalculator(focusSessionLength) {
    
    let numberOfPomodoros 
    let pomodoroLength = 25
    const breakLength = 5
    const longBreakLength = 15
    const pomodoroArray = []
    const breakArray = []
    let remainingFocusSessionTime = focusSessionLength

    if(60 < focusSessionLength < 90){
        pomodoroLength = 20
    }
    
    if(focusSessionLength <= 60){
        pomodoroLength = 15
    }

    if(focusSessionLength <= 30){
        pomodoroLength = focusSessionLength
    }

    numberOfPomodoros = focusSessionLength/pomodoroLength

    for( let i=1; i<=numberOfPomodoros; i++){
        if ((i+1.0001) > numberOfPomodoros) {
            if(remainingFocusSessionTime <= 0){
                remainingFocusSessionTime = 0    
            }else{
                pomodoroArray.push(remainingFocusSessionTime)
                i++
            }    
        } else if (i % 4 === 0) {
            pomodoroArray.push(pomodoroLength)
            if (remainingFocusSessionTime >= pomodoroLength) {
              breakArray.push(longBreakLength)
            }
            remainingFocusSessionTime -= (pomodoroLength + longBreakLength)
        } else {
            pomodoroArray.push(pomodoroLength)
            if (remainingFocusSessionTime >= pomodoroLength) {
              breakArray.push(breakLength)
            }
            remainingFocusSessionTime -= (pomodoroLength + breakLength)
        }
                      
    }

    const sortedPomodoroArray = pomodoroArray.sort((a,b) => b-a)
            
    const focusSessionDetails = {pomodoros:sortedPomodoroArray, breaks: breakArray}

    return focusSessionDetails


}