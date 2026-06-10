import React, { useEffect, useState } from "react"
import ToDo from './ToDo'
import axios from "axios"
import { deleteBtn, deleteTask, getTasks, port, title, errAlert } from "./const"

export default function Home(){
  const [tasks, setTasks] = useState([]) 
  
  const getTasksList = async () => {
    try{
     const result = await axios.get(`${ port }${ getTasks }`)
     setTasks(result.data)
    } catch(err) { alert(errAlert) }
  }

  useEffect(() => { getTasksList() }, []) 

  const handleDeleteTask = async (id) => {
    try{
      const res = await axios.delete(`${ port }${ deleteTask }${ id }`)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (err) { alert(errAlert) }
  }  
  
  return(
    <div> 
      <h2 className="title">{ title }</h2>
      <ToDo setTasks={setTasks}/>
      { tasks.map((task, index) => 
      <div className="task" key={ index }>
        <p>{ task.task }</p>
        <button 
          className="delete-btn" 
          onClick={ () => handleDeleteTask(task.id) }
        >
          { deleteBtn }
        </button> 
      </div>
      )}
    </div>
  )
}