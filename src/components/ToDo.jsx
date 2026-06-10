import React, { useRef } from "react"
import axios from 'axios'
import { AddBtn, addTask, empty, errAlert, placeholder, port } from "./const"

export default function ToDo({ setTasks }){
    const taskRef = useRef()

    const handleAddTask = async () => {
      if(taskRef.current.value.trim() !== empty){
        try{
          const result = await axios.post(`${ port }${ addTask }`, { task: taskRef.current.value } )
          setTasks(prev => [...prev, result.data])
        } catch (err) { alert(errAlert) }
      }
      taskRef.current.value = empty
    }

    return(
        <>
          <input 
            type="text" 
            placeholder={ placeholder }
            className="input" 
            ref={ taskRef }
          />
          <button className="add-btn" onClick={ handleAddTask }>
            { AddBtn }
          </button>
        </>
    )
}