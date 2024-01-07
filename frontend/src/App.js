import {useState, useEffect} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import FocusSessionForm from './components/FocusSessionForm'
import TaskForm from'./components/TaskForm'
import TaskItem from './components/TaskItem'
import Timer from './components/Timer'

function App() {

  const [existingTasks, setExistingTasks] = useState(JSON.parse(localStorage.getItem('tasks')) ?? [])
  const [priorities, setPriorities] = useState(JSON.parse(localStorage.getItem('priorities')) ?? [])
  const [isFocusSessionStarted, setIsFocusSessionStarted] = useState(false)
  const [focusSessionDetails, setFocusSessionDetails] = useState(JSON.parse(localStorage.getItem('focusSessionDetails')) ?? {})
  const [pomodorosIndex, setPomodorosIndex] = useState(0)
  const [breaksIndex, setBreaksIndex] = useState(0)

  const toggleFocusSession = () => {
    setFocusSessionDetails(JSON.parse(localStorage.getItem('focusSessionDetails')) ?? {})
    setIsFocusSessionStarted(!isFocusSessionStarted)
    setPomodorosIndex(0)
    setBreaksIndex(0)
  }
  
  const addNewTask = (newTask) => {
    setExistingTasks((prevTasks) => [...prevTasks, newTask])
  }

  const handleTaskChange = (updatedTasks) => {
    setExistingTasks(updatedTasks)
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))  
  }

  const updatePriorities = (updatedPriorities) => {
    setPriorities(updatedPriorities)

    localStorage.setItem('priorities', JSON.stringify(updatedPriorities)) 
  }

  const handleTimerEnd = () => {    
    if(pomodorosIndex >= focusSessionDetails.pomodoros.length){
      toggleFocusSession()
      localStorage.removeItem('focusSessionDetails')
    } else if(pomodorosIndex===breaksIndex) {
      setPomodorosIndex(pomodorosIndex+1)
    } else{
      setBreaksIndex(breaksIndex+1)
    }
  }

  const handleCompleteClick = () => {
    
    // Strike out the task in the existingTasks array
    const index = existingTasks.findIndex((task) => task.task === priorities[0])

    const updatedTask = {task: priorities[0], completed: true}

    const updatedTasks = [
      ...existingTasks.slice(0, index),
      updatedTask,
      ...existingTasks.slice(index + 1),
    ]

    handleTaskChange(updatedTasks)

    // Update the priorities array by removing the top priority
   const updatedPriorities = [...priorities.slice(0, 0), ...priorities.slice(1)]
   updatePriorities(updatedPriorities)
  }

  const handleClearAll = () => {

    localStorage.removeItem('tasks')
    setExistingTasks(JSON.parse(localStorage.getItem('tasks')) ?? [])

    localStorage.removeItem('priorities')
    setPriorities(JSON.parse(localStorage.getItem('priorities')) ?? [])

  }


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(existingTasks))  
    
  },[existingTasks,isFocusSessionStarted])

 

  return (
    <>
      <div className = "container mx-auto">
        <Header />
        {/* Heading Section with Intro */}
        <section className= "heading">
          <h1 className ="flex items-center text-center justify-center">
            Welcome to the Productivity App      
          </h1>
          <p className ="text-2xl text-center">This app is designed to help you focus on tasks using the pomodoro technique</p>
        </section>
        {isFocusSessionStarted ? (
          <>
            <section className="form shadow-md p-4">
              {pomodorosIndex===breaksIndex ? (
                <>
                  <h1 className="text-center text-3xl font-bold underline">
                    Focus Period {pomodorosIndex+1}
                  </h1>
                  <Timer initialTime={focusSessionDetails.pomodoros[pomodorosIndex]} onTimerEnd={handleTimerEnd} />
                </>
                ) : (
                <>
                  <h1 className="text-center text-3xl font-bold underline">
                    Break {breaksIndex+1}
                  </h1>
                  <Timer initialTime={focusSessionDetails.breaks[breaksIndex]} onTimerEnd={handleTimerEnd} />
                </>
              )}
              <div className='justify-center border border-gray-300 background-gray mb-5'>
                <h2 className="text-center text-2xl pb-2 pt-5">
                  <span className="font-bold">Task: </span>
                  <span>{priorities[0]}</span>
                </h2>
                <div className='flex justify-center'>
                  <button className="btn mt-5 mb-2" onClick={handleCompleteClick}>Task Completed</button>
                </div>
              </div>
              <div className="task-list pt-4 pb-4 border-b border-gray-300">
                <ul className="list-disc ml-4 mr-4 pb-4 border-t border-gray-300" >
                    {focusSessionDetails.pomodoros.map((_, index)=> (
                        <li className='pt-2 pb-2 pl-2 border-b border-gray-300 flex items-center"'>
                            <span className="font-bold">
                            Focus Period {index +1 }: 
                            </span>
                            <span className= {index===pomodorosIndex ? "ml-2 font-bold":"ml-2"}> {focusSessionDetails.pomodoros[index]} minutes {focusSessionDetails.breaks[index] ? `, followed by a ${focusSessionDetails.breaks[index]} break.`: ''}
                            </span>
                        </li>
                    ))}
                    </ul>
                </div>
              <button className="btn btn-block" onClick ={toggleFocusSession}>Stop Focus Session</button>
            </section>
          </>
        ) : (
          <>
            {/* Focus Session Form section */}
            <section className="form shadow-md p-4">
              <h1 className="text-center text-2xl font-bold pb-4 border-b">Focus Session Details</h1>
              <FocusSessionForm 
                existingTasks = {existingTasks} existingPriorities = {priorities} updatePriorities={updatePriorities}
                toggleFocusSession={toggleFocusSession}
              />
              <h1 className="text-center text-2xl font-bold pb-4 border-b">Add Tasks</h1>
               <TaskForm addNewTask={addNewTask}/>
            </section>
            {/* Tasks Form and Items section */}
            <section className="form shadow-md p-4">
              <h1 className="text-center text-2xl font-bold pb-4">All Tasks</h1>
              {existingTasks.length === 0 ? (<></>): (
                <>
                  <div className = "w-full pb-4 border-t">
                    {existingTasks.map((task, index)=>(
                      <TaskItem key={task.task} task = {task.task} completed = {task.completed} index={index} onTaskChange={handleTaskChange}/>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2 mb-2">
                      <button 
                        className ="btn"
                        onClick = {handleClearAll}
                      >
                        Clear All
                      </button>
                  </div>
                </>
                )}
            </section>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
