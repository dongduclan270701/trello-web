import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const List = () => {
    const navigate = useNavigate()
    const [listTodos, setListTodos] = useState([])
    async function fetchData() {
        await axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                let todo = res.data
                setListTodos(todo)
            })
            .catch(err => {
                console.error(err)
            })
    }
    useEffect(() => {
        fetchData()
    })
    const handleViewDataUser = (todo) => {
        navigate(`/detail/${todo.id}`)
    }
    return (
        <div className="list-user-container">
            <div className="title">
                Fetch all list users
            </div>
            <div className="list-user-content">
                {listTodos && listTodos.length > 0 &&
                    listTodos.map((item, index) => {
                        return (
                            <div className="child" key={item.id} onClick={() => handleViewDataUser(item)}>
                                <span>{index + 1} - {item.title} - {item.completed.toString()}</span>
                            </div>
                            // <div>1</div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default List
