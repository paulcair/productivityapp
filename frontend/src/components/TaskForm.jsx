import {useState} from 'react'


function TaskForm({ addNewTask }) {
        
    const [newTask, setNewTask] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        const taskToAdd = {task:newTask, completed:false}

        addNewTask(taskToAdd)
        
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