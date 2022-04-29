import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
    const [todo, setTodo] = useState({})
    const params = useParams()
    const navigate = useNavigate()
    async function fetchData() {
        await axios.get(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
            .then(res => {
                const todo = res && res.data ? res.data : []
                setTodo(todo)
            })
            .catch(err => {
                console.error(err)
            })
    }
    useEffect(() => {
        fetchData()
    })
    let isEmptyObj = Object.keys(todo).length === 0
    const handleBackListUser = () => {
        navigate('/list')
    }
    return (
        <div>
            hello world from detail todo id: {params.id}
            {isEmptyObj === false &&
                <>
                    <div>
                        Title : {todo.title}
                    </div>
                    <div>
                        Completed : {todo.completed.toString()}
                    </div>
                    <div>
                        <button onClick={() => handleBackListUser()}>Back</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Detail
