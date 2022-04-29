import React, { useState } from 'react'

const Addtodo = (props) => {
    const { addNewToDo } = props
    const [ title, setTitle ] = useState('')
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleClickAddToDo = () => {
        if (!title ) {
            //undifined/null/empty
            alert('Opsss Missing Title!!')
            return
        }
        let todo = {
            id : Math.floor(Math.random()*10000),
            title : title
        }
        addNewToDo(todo)
        setTitle('')
    }
    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(event) => handleChangeTitle(event)}
            />
            <button
                type="button"
                className="btn-add"
                onClick={() => handleClickAddToDo()}
            >
                Add
            </button>
        </div>
    )
}

export default Addtodo
