import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import pomodoroCalculator from '../features/pomodoroCalculator'

function FocusSessionForm({ existingTasks, existingPriorities,updatePriorities, toggleFocusSession}) {

    const [focusSessionLength, setFocusSessionLength] = useState()
    const [focusSessionDetails, setFocusSessionDetails] = useState({pomodoros:[],breaks:[]})

    useEffect(()=> {

    },[focusSessionDetails])

    const onSubmit = (e) => {
        e.preventDefault()

        if(focusSessionDetails.pomodoros.length === 0){
            toast.error('Please set a focus session time')

        }else{
            localStorage.setItem('focusSessionDetails', 
            JSON.stringify(focusSessionDetails))
            toggleFocusSession()

        }
        
    }

    const handleTimeInput = (e) => {
        const inputValue = parseInt(e.target.value)

        if (!isNaN(inputValue)) {
            setFocusSessionLength(Math.max(0, inputValue))
        } else {
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
            <div className="pt-4 pb-4 flex items-center ">
                <label htmlFor="duration">Minutes:</label>
                <input 
                type="number" 
                name='time' 
                id='time' 
                value={focusSessionLength}
                step = '1'
                min = '0'
                onChange={handleTimeInput}
                className ="ml-4 time-input"
                />
            </div>
            {focusSessionDetails.pomodoros.length === 0 ? 
                (
                    <></>
                ) : (
                    <>
                        <div className="task-list pt-4 pb-4 border-b border-gray-300">
                            <ul className="list-disc ml-4 mr-4 pb-4 border-t border-gray-300" >
                                {focusSessionDetails.pomodoros.map((_, index)=> (
                                    <li className='pt-2 pb-2 pl-2 border-b border-gray-300 flex items-center"'>
                                        <span className="font-bold">
                                        Focus Period {index +1 }: 
                                        </span>
                                        <span className="ml-2"> {focusSessionDetails.pomodoros[index]} minutes {focusSessionDetails.breaks[index] ? `, followed by a ${focusSessionDetails.breaks[index]} break.`: ''}
                                        </span>
                                    </li>
                                ))}
                                </ul>
                        </div>
                    </>
                )
            }
            {existingTasks.length === 0 ? (<></>) : (
                <>
                    <h1 className="text-xl pt-4">Select Focus Session Priorities</h1>
                    <div className="task-list pt-4 pb-4 ">
                        <ul className="list-disc ml-4 mr-4 pb-4 border-t border-gray-300" >
                            {existingTasks.map((task, index)=> (
                                <li key = {index} onClick = {() => selectPriority(task.task)} className='pt-2 pb-2 pl-2 border-b border-gray-300 flex items-center"'>
                                    {task.task}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
                )
            }
            {existingPriorities.length === 0 ? (<></>) : (
                <>
                <div className="task-list pt-4 pb-4 border-t border-gray-300">
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