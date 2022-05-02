import React, { useState, useEffect, useRef } from 'react'
import 'Style/ListTrello.scss'
// import { initialData } from 'actions/initialData' // Lấy fake data
import Column from 'Component/Column/Column'
import { isEmpty, cloneDeep } from 'lodash' // Check empty sử dụng thư viện lodash
import { mapOrder } from 'utils/sorts' // Lấy hàm sắp xếp ký tự
import { applyDrap } from 'utils/drapDrop' // Lấy hàm kéo thả
import { Container, Draggable } from 'react-smooth-dnd' // Sử dụng thử viện kéo thả
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap' // Sử dụng thư viện của react bootstrap
import { toast } from 'react-toastify'
import { fetchBoardDetails, createNewColumn, updateBoard, updateColumn, updateCard } from 'actions/ApiCall'

const Listtrello = () => {
    const [board, setBoard] = useState({}) // Khởi tạo state
    const [columns, setColumns] = useState([]) // Khởi tạo state
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false) // Khởi tạo state
    //test card
    const [cards, setCards] = useState([])

    // console.log(cards)
    //Hàm đóng mở form thêm column
    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }
    const newColumnInputRef = useRef(null)

    const [newColumnTitle, setNewColumnTitle] = useState('') // Khởi tạo state
    const OnNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

    //Hàm quản lý và update vòng đời của component
    useEffect(() => {
        //Tìm fake data
        // const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        const boardId = '626aae8d9809f2417bed8298'
        fetchBoardDetails(boardId)
            .then(board => {
                setBoard(board)

                //sort column and set state cho column
                setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
            })
            .catch(err => {
                console.error(err)
            })

        // Check tìm Fake data
        // if (boardFromDB) {
        //     // Set state cho board
        //     setBoard(boardFromDB)

        //     //sort column and set state cho column
        //     setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        // }
    }, [])

    //Hàm quản lý và update vòng đời của component
    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            //Focus vào thẻ input
            newColumnInputRef.current.focus()
            //Chọn tất cả value tồn tại trong thẻ input
            newColumnInputRef.current.select()
        }
    }, [openNewColumnForm]) //Truyền tham số điều kiện khi thực hiện chức năng trong component

    // Check có tồn tại fake data khi set ở trong effect hay ko
    if (isEmpty(board)) {
        return <div className="not-found">Board not Found!!</div>
    }

    // Hàm kéo column và lấy vị trí column đó và set lại state
    const onColumnDrop = (dropResult) => {

        let newColumns = cloneDeep(columns)
        newColumns = applyDrap(newColumns, dropResult)

        let newBoard = cloneDeep(board)
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns
        setBoard(newBoard)
        setColumns(newColumns)
        updateBoard(newBoard._id, newBoard)
            .catch(() => {
                setBoard(board)
                setColumns(columns)
            })

    }

    // Hàm kéo card và lấy vị trí card đó và set lại state
    const onCardDrop = (columnId, dropResult) => {
        // if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        //     let newColumns = [...columns]
        //     let currentColumn = newColumns.find(c => c._id === columnId)

        //     currentColumn.cards = applyDrap(currentColumn.cards, dropResult)

        //     currentColumn.cardOrder = currentColumn.cards.map(i => i._id)

        //     setColumns(newColumns)
        //     // console.log(dropResult.payload)
        // }
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(c => c._id === columnId)
            currentColumn.cards = applyDrap(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(i => i._id)
            setColumns(newColumns)
            if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {

                updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(newColumns))
            } else {
                updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(newColumns))
                if (dropResult.addedIndex !== null) {
                    let currentCard = cloneDeep(dropResult.payload)
                    currentCard.columnId = currentColumn._id
                    updateCard(currentCard._id, currentCard)
                }
            }
        }
    }

    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumnToAdd = {
            // id: Math.random().toString(36).substr(2, 5), // 5 random characters, will remove when we implement code api
            boardId: board._id,
            title: newColumnTitle.trim()
        }
        createNewColumn(newColumnToAdd)
            .then(column => {
                let newColumns = [...columns]
                newColumns.push(column)

                let newBoard = { ...board }
                newBoard.columnOrder = newColumns.map(c => c._id)
                newBoard.columns = newColumns

                setBoard(newBoard)
                setColumns(newColumns)
                setNewColumnTitle('')
                toggleOpenNewColumnForm()
                toast('🦄 Wow so easy!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
            })


    }
    const onUpdateColumnState = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id
        let newColumns = [...columns]
        const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(columnIndexToUpdate, 1)
            toast('🦄 Delete Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        } else {
            //update column information
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
            toast('🦄 Update Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns
        // console.log(newColumns)
        setBoard(newBoard)
        setColumns(newColumns)

    }

    const onUpdateCard = (dataCard) => {

        const cardColumnsIdToUpdate = dataCard.columnId
        const cardIdToUpdate = dataCard._id
        let newBoard = { ...board }
        let getCardOrder = newBoard.columns.find(id => id._id === cardColumnsIdToUpdate)

        setCards(getCardOrder.cards)
        let newCards = [...cards]
        const cardIndexToUpdate = newCards.findIndex(i => i._id === cardIdToUpdate)
        let newColumns = [...columns]
        if (cardIndexToUpdate !== -1) {
            newCards.splice(cardIndexToUpdate, 1, dataCard)
            newBoard.columns = newColumns
            const cardNew = newBoard.columns.find(i => i._id === cardColumnsIdToUpdate)
            cardNew.cards = newCards
        } else {
            return
        }
        // newBoard.columnOrder = newColumns.map(c => c.id)
        toast('🦄 Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })
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
                            onUpdateColumnState={onUpdateColumnState}
                            onUpdateCard={onUpdateCard}
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
