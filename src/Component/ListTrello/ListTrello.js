import React, { useState, useEffect } from 'react'
import 'Style/ListTrello.scss'
import { initialData } from 'actions/initialData'
import Column from 'Component/Column/Column'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utils/sorts'
import { applyDrap } from 'utils/drapDrop'
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
        // console.log(dropResult)
        let newColumns = [...columns]
        newColumns = applyDrap(newColumns, dropResult)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setBoard(newBoard)
        setColumns(newColumns)
    }

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(c => c.id === columnId)

            currentColumn.cards = applyDrap(currentColumn.cards, dropResult)

            currentColumn.cardOrder = currentColumn.cards.map(i => i.id)

            setColumns(newColumns)
            // console.log(currentColumn.cardOrder)
            // console.log(dropResult)
        }
    }

    return (
        <nav className="board-columns">
            <Container
                onDrop={onColumnDrop}
                orientation="horizontal"
                dragHandleSelector='.column-drag-handle'
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
                getChildPayload={index => columns[index]}
            >
                {columns.map((column, index) =>
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} />
                    </Draggable>
                )}

            </Container>
            <div className="add-new-column">
                <i className="fa fa-plus icon" /> Add another card
            </div>
        </nav>

    )
}

export default Listtrello
