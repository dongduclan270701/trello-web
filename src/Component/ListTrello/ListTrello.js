import React, { useState, useEffect, useRef } from 'react'
import 'Style/ListTrello.scss'
import { initialData } from 'actions/initialData'
import Column from 'Component/Column/Column'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utils/sorts'
import { applyDrap } from 'utils/drapDrop'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'

const Listtrello = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }
    const newColumnInputRef = useRef(null)

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const OnNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            //sort column

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [openNewColumnForm])

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

    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumnToAdd = {
            id: Math.random().toString(36).substr(2, 5), // 5 random characters, will remove when we implement code api
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
        }

        let newColumns = [...columns]
        newColumns.push(newColumnToAdd)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setBoard(newBoard)
        setColumns(newColumns)
        setNewColumnTitle('')
        toggleOpenNewColumnForm()
    }
    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate.id
        let newColumns = [...columns]
        const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(columnIndexToUpdate, 1)
        } else {
            //update column information
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
        }
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setBoard(newBoard)
        setColumns(newColumns)
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
                        <Column
                            column={column}
                            onCardDrop={onCardDrop}
                            onUpdateColumn={onUpdateColumn}
                        />
                    </Draggable>
                )}

            </Container>
            <BootstrapContainer className="trello-clone-container">
                {!openNewColumnForm ?
                    <Row>
                        <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
                            <i className="fa fa-plus icon" /> Add another card
                        </Col>
                    </Row>
                    :
                    <>
                        <Row>
                            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
                                <i className="fa fa-plus icon" /> Add another card
                            </Col>
                        </Row>
                        <Row>
                            <Col className="enter-new-column">
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder="Text..."
                                    className="input-enter-new-column"
                                    ref={newColumnInputRef}
                                    value={newColumnTitle}
                                    onChange={OnNewColumnTitleChange}
                                    onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                                />
                                <Button variant="success" size="sm" onClick={addNewColumn}>
                                    Add column
                                </Button>
                                <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                                    <i className="fa fa-trash icon" />
                                </span>
                            </Col>
                        </Row>
                    </>
                }
            </BootstrapContainer>
        </nav>

    )
}

export default Listtrello
