import React, { useState, useEffect } from 'react'
import 'Style/ListTrello.scss'
import { initialData } from 'actions/initialData'
import Column from 'Component/Column/Column'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utils/sorts'
import { Container, Draggable } from 'react-smooth-dnd'

const Listtrello = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            //sort column

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    if (isEmpty(board)) {
        return <div className="not-found">Board not Found!!</div>
    }
    const onColumnDrop = (dropResult) => {
        console.log(dropResult)
    }
    return (
        <nav className="board-colums">
            <Container
                onDrop={onColumnDrop}
                orientation="horizontal"
                dragHandleSelector='.column-drag-handle'
                dropPlaceholder={{
                    animationDuration:150,
                    showOnTop:true,
                    className: 'column-drop-preview'
                }}
                getChildPayload={index => columns[index]}
            >
                {columns.map((column, index) =>
                    <Draggable key={index}>
                        <Column column={column} />
                    </Draggable>
                )}
            </Container>
        </nav>

    )
}

export default Listtrello
