import {useState, useEffect} from 'react'
import Header from './components/Header'
import TaskForm from'./components/TaskForm'
import TaskItem from './components/TaskItem'

function App() {

  const [existingTasks, setExistingTasks] = useState(JSON.parse(localStorage.getItem('tasks')) ?? [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(existingTasks))    
  },[existingTasks])

  const addNewTask = (newTask) => {
    setExistingTasks((prevTasks) => [...prevTasks, newTask])
  }
  
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
        {/* Timer section */}
        <section className="form shadow-md p-4">
          <h1 className="text-center text-2xl font-bold pb-4">Focus Session Timer</h1>
        </section>
        {/* Tasks Form and Items section */}
        <section className="form shadow-md p-4">
          <h1 className="text-center text-2xl font-bold pb-4 border-b">Tasks for this Focus Session</h1>
          <div className = "w-full pb-4">
            {existingTasks.map((task, index)=>(
              <TaskItem key={index} task = {task} />
            ))}
          </div>
          <TaskForm addNewTask={addNewTask}/>
        </section>
      </div>
    </>
  );
}

export default App;
