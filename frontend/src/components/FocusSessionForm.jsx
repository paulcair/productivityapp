import {useState, useEffect} from 'react'
import pomodoroCalculator from '../features/pomodoroCalculator'

function FocusSessionForm({ existingTasks, existingPriorities,updatePriorities}) {

    const [focusSessionLength, setFocusSessionLength] = useState()
    const [focusSessionDetails, setFocusSessionDetails] = useState({pomodoros:[],breaks:[]})

    useEffect(()=> {

    },[focusSessionDetails])

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const handleTimeInput = (e) => {
        const inputValue = parseInt(e.target.value)

        if (!isNaN(inputValue)) {
            // const roundedValue = Math.max(5, Math.round(inputValue / 5) * 5)
            // setFocusSessionLength(Math.max(0, roundedValue))
            setFocusSessionLength(Math.max(0, inputValue))
        } else {
            // Handle invalid input, e.g., non-numeric characters
            setFocusSessionLength()
        }     
        
        setFocusSessionDetails(pomodoroCalculator(inputValue))
    }

    const selectPriority = (task) => {
        
        const updatedPriorities = [...existingPriorities, task]
      
        updatePriorities(updatedPriorities)       

    }

    const deselectPriority = (index) => {
        
        const updatedPriorities = [...existingPriorities.slice(0, index), ...existingPriorities.slice(index + 1)]
       
        updatePriorities(updatedPriorities)       

    }

  return (
    <form onSubmit={onSubmit}>
        <h1 className="text-xl pt-4 pb-4">Set Focus Session Duration</h1>
        <div className="form-group">
            <div className="pt-4 pb-4 flex items-center border-b border-gray-300">
                <label htmlFor="duration">Minutes (multiple of 5):</label>
                <input 
                type="number" 
                name='time' 
                id='time' 
                value={focusSessionLength}
                step = '5'
                min = '0'
                onChange={handleTimeInput}
                className ="ml-4 time-input"
                />
            </div>
            {focusSessionDetails.pomodoros.length === 0 ? (
            <></>
            ) : (
                <>
                    {focusSessionDetails.pomodoros.length === 1 ? (
                        <p className='mt-4 font-bold text-xl'>You will have {focusSessionDetails.pomodoros.length}x {focusSessionDetails.pomodoros[0]}-minute focus period</p>
                    ):(
                        <>
                       {focusSessionDetails.pomodoros[0] === focusSessionDetails.pomodoros[1] ? (
                        <p className='mt-4 font-bold text-xl'>You will have {focusSessionDetails.pomodoros?.length}x {focusSessionDetails.pomodoros[0]}-minute focus periods with {focusSessionDetails.breaks?.length}x {focusSessionDetails.breaks[0]}-minute break(s) </p>
                    ):(
                    <></>
                    )}
                </>
                )}
                </>
            )}
            <h1 className="text-xl pt-4">Select Focus Session Priorities</h1>
            <div className="task-list pt-4 pb-4 border-b border-gray-300">
                <ul className="list-disc ml-4 mr-4 pb-4 border-t border-gray-300" >
                    {existingTasks.map((task, index)=> (
                        <li key = {index} onClick = {() => selectPriority(task)} className='pt-2 pb-2 pl-2 border-b border-gray-300 flex items-center"'>
                            {task}
                        </li>
                    ))}
                </ul>
            </div>
            {existingPriorities.length === 0 ? (<></>) : (
                <>
                <div className="task-list pt-4 pb-4 border-b border-gray-300">
                    <ol className="list-disc ml-4 mr-4 border border-gray-300 background-gray" >
                        {existingPriorities.map((task, index)=> (
                            <li key = {index} onClick = {() => deselectPriority(index)} className='pt-2 pb-2 pl-2 flex items-center"'>
                                <span className="font-bold">
                                    {`Priority ${index + 1}: `}
                                </span>
                                <span className = "ml-3 ">
                                    {task}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
                </>)}
            <button className="btn btn-block bg-black mt-8" type="submit">Start Focus Session</button>
        </div>
    </form>
  )
}

export default FocusSessionForm