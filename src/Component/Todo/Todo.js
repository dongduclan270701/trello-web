import React from 'react'
import { useState } from 'react'
import Addtodo from './AddToDo'

const Todo = () => {
    const [listTodo, setListTodo] = useState([{
        id: '1',
        title: 'Doing homework'
    },
    {
        id: '2',
        title: 'Doing video'
    },
    {
        id: '3',
        title: 'Doing bugs'
    }])
    const [editTodo, setEditTodo] = useState({})
    const isEmptyObj = Object.keys(editTodo).length === 0
    const hanldeEditTodo = (todo) => {
        let isEmptyObj = Object.keys(editTodo).length === 0 
        setEditTodo(todo)
        if (isEmptyObj === false && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodo]
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id))
            listTodosCopy[objIndex].title = editTodo.title
            setListTodo(listTodosCopy)
            setEditTodo({})
        }
    }
    const hanldeOnChangeEditTodo = (event) => {
        let editTodoCopy = { ...editTodo }
        editTodoCopy.title = event.target.value
        setEditTodo(editTodoCopy)
    }
    const hanldeDeleteToDo = (todo) => {
        let currentToDos = listTodo
        currentToDos = currentToDos.filter(item => item.id !== todo.id)
        setListTodo(currentToDos)
    }
    const addNewToDo = (todo) => {
        let listTodosNew = [...listTodo, todo]
        
        setListTodo(listTodosNew)
        
    }
    return (
        <>
            <p>
                TODO APP
            </p>
            <div className='list-todo-container'>
                <Addtodo addNewToDo={addNewToDo} />
                <div className="list-todo-content">
                    {listTodo && listTodo.length > 0 &&
                        listTodo.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>
                                    {isEmptyObj === true ?
                                        <span>
                                            {index + 1} - {item.title} -
                                        </span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span>
                                                    {index + 1} -
                                                    <input
                                                        value={editTodo.title}
                                                        onChange={(event) => hanldeOnChangeEditTodo(event)}
                                                    />
                                                </span>
                                                :
                                                <span>
                                                    {index + 1} - {item.title} -
                                                </span>
                                            }
                                        </>
                                    }
                                    <button
                                        className="btn-edit"
                                        onClick={() => hanldeEditTodo(item)}
                                    >
                                        {isEmptyObj === false && editTodo.id === item.id ? 'Save' : 'Edit'}
                                    </button>
                                    -
                                    <button
                                        className="btn-delete"
                                        onClick={() => hanldeDeleteToDo(item)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Todo
