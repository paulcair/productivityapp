import {useState} from 'react'
import DeleteButton from './DeleteButton'

function TaskItem({task, index, onTaskChange}) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleDeleteClick = () => {
    
    console.log('Delete button Clicked')
    console.log(index)
    console.log(task)
    // Retrieve existing tasks from local storage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove the task from the array based on its index
    const updatedTasks = [...existingTasks.slice(0, index), ...existingTasks.slice(index + 1)];

    // Pass the updated tasks back to App.js
    onTaskChange(updatedTasks)
  }

 
    
  return (
    <div className="flex items-start justify-between w-full p-2 border-b border-gray-300">
      <div className="flex items-start">
        <input 
          type = "checkbox" 
          checked = {isChecked}
          onChange = {handleCheckBoxChange}
          className='mr-2 mt-2 checkbox-small'
        />
        <p
          className={`text-lg ${isChecked ? 'line-through text-gray-500':''} ml-4`}
        >
          {task}
        </p>
      </div>
      <DeleteButton onClick={handleDeleteClick}/>
    </div>
  )
}

export default TaskItem