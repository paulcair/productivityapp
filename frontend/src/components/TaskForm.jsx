import {useState, useEffect} from 'react'


function TaskForm() {
    // Get existing tasks from local storage
    const [existingTasks, setExistingTasks] = useState(JSON.parse(localStorage.getItem('tasks')) ?? [])
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(existingTasks))    
    },[existingTasks])

    const onSubmit = (e) => {
        e.preventDefault()

        // Add the new task to the array
        setExistingTasks([...existingTasks, newTask])

        
        setNewTask('')
    }
  
    return (
        <form onSubmit={onSubmit}>
            <h1 className="text-xl">Create Task</h1>
            <div className="form-group border-b border-gray-300">
                <div className="pt-4 flex items-center">
                    <label htmlFor="text">Description:</label>
                    <input 
                    type="text" 
                    name='task' 
                    id='task' 
                    value={newTask}
                    onChange={(e)=>setNewTask(e.target.value)}
                    className ="ml-4"
                    />
                </div>
                <button className="btn btn-block bg-black mt-2" type="submit">Add Task</button>
            </div>
        </form>
    )
}

export default TaskForm