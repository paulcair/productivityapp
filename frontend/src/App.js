import {useState, useEffect} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import FocusSessionForm from './components/FocusSessionForm'
import TaskForm from'./components/TaskForm'
import TaskItem from './components/TaskItem'

function App() {

  const [existingTasks, setExistingTasks] = useState(JSON.parse(localStorage.getItem('tasks')) ?? [])
  const [priorities, setPriorities] = useState(JSON.parse(localStorage.getItem('priorities')) ?? [])
  const [isFocusSessionStarted, setIsFocusSessionStarted] = useState(false)

  const toggleFocusSession = () => {
    setIsFocusSessionStarted(!isFocusSessionStarted)
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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(existingTasks))   
    
  },[existingTasks])

 

  return (
    <>
      <div className = "container mx-auto">
        <Header />
        {/* Heading Section with Intro */}
        <section className= "heading">
          <h1 className ="flex items-center justify-center">
            Welcome to the Productivity App      
          </h1>
          <p className ="text-2xl text-center">This app is designed to help you focus on tasks using the pomodoro technique</p>
        </section>
        {isFocusSessionStarted ? (
          <>
            <h1>Focus Session Started</h1>
            <button className="btn btn-block" onClick ={toggleFocusSession}>Stop Focus Session</button>
          </>
        ) : (
          <>
            {/* Focus Session Form section */}
            <section className="form shadow-md p-4">
              <h1 className="text-center text-2xl font-bold pb-4 border-b">Focus Session Objectives</h1>
              <FocusSessionForm 
                existingTasks = {existingTasks} existingPriorities = {priorities} updatePriorities={updatePriorities}
                toggleFocusSession={toggleFocusSession}
              />
            </section>
            {/* Tasks Form and Items section */}
            <section className="form shadow-md p-4">
              <h1 className="text-center text-2xl font-bold pb-4 border-b">All Tasks</h1>
              <div className = "w-full pb-4">
                {existingTasks.map((task, index)=>(
                  <TaskItem key={index} task = {task} index={index} onTaskChange={handleTaskChange}/>
                ))}
              </div>
              <TaskForm addNewTask={addNewTask}/>
            </section>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
