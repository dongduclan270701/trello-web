import React, { useState, useEffect, useRef } from 'react'
import 'Style/Column.scss'
import Card from 'Component/Card/Card'
import { mapOrder } from 'utils/sorts' // Lấy hàm kéo thả
import { Container, Draggable } from 'react-smooth-dnd' // Sử dụng thử viện kéo thả
import { Dropdown, Form, Button } from 'react-bootstrap' // Sử dụng thư viện của react bootstrap
import ConfirmModals from 'Component/Common/ConfirmModals'
import { MODAL_ACTION_CONFIRM } from 'utils/constants'
import { selectAllInlineText, saveContentAfterPressEnter } from 'utils/contentEditable' // Lấy hàm KeyDown
import { cloneDeep } from 'lodash' // Lấy chức năng của thư viện lodash
import { createNewCards, updateColumn } from 'actions/ApiCall'

function Column(props) {
    const { column, onCardDrop, onUpdateColumnState, onUpdateCard } = props //Nhận giá trị props từ component cha xuống component con
    const cards = mapOrder(column.cards, column.cardOrder, '_id')

    const [showConfirmModal, setShowConfirmModal] = useState(false) // Khởi tạo state
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal) // Hàm đóng mở alert xác nhận

    const [columnTitle, setColumnTitle] = useState('') // Khởi tạo state
    const HandleColumnTitleChange = (e) => setColumnTitle(e.target.value) // Hàm thay đổi và set giá trị khi nhập giá trị tại thẻ

    const [openNewCardForm, setOpenNewCardForm] = useState(false) // Khởi tạo state

    //Hàm đóng mở form thêm card
    const toggleOpenNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm)
    }

    const newCardTextareaRef = useRef(null)

    const [newCardTitle, setNewCardTitle] = useState('') // Khởi tạo state
    const OnNewCardTitleChange = (e) => setNewCardTitle(e.target.value) // Hàm thay đổi và set giá trị khi nhập giá trị tại thẻ

    //Hàm quản lý và update vòng đời của component
    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])

    //Hàm quản lý và update vòng đời của component
    useEffect(() => {
        if (newCardTextareaRef && newCardTextareaRef.current) {
            //Focus vào thẻ input
            newCardTextareaRef.current.focus()
            //Chọn tất cả value tồn tại trong thẻ input
            newCardTextareaRef.current.select()
        }
    }, [openNewCardForm])

    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            //remove column
            const newColumn = {
                ...column,
                _destroy: true
            }
            updateColumn(newColumn._id, newColumn)
                .then(updatedColumn => {
                    onUpdateColumnState(updatedColumn)
                })
        }
        toggleShowConfirmModal()
    }

    const HandleColumnTitleBlur = () => {
        
        if (columnTitle !== column.title) {
            const newColumn = {
                ...column,
                title: columnTitle
            }
            console.log(columnTitle)
            console.log(column.title)
            updateColumn(newColumn._id, newColumn)
                .then(updatedColumn => {
                    updatedColumn.cards = newColumn.cards
                    onUpdateColumnState(updatedColumn)
                })
        }

    }

    const addNewCard = () => {
        if (!newCardTitle) {
            newCardTextareaRef.current.focus()
            return
        }

        const newCardToAdd = {
            // id: Math.random().toString(36).substr(2, 5), // 5 random characters, will remove when we implement code api
            boardId: column.boardId,
            columnId: column._id,
            title: newCardTitle.trim()
        }
        createNewCards(newCardToAdd)
            .then(card => {
                let newColumn = cloneDeep(column) //cloneDeep để khi cập nhật lại value sẽ chỉ cập nhật value khi thực hiện, còn value trc vẫn giữ nguyên
                newColumn.cards.push(card)
                newColumn.cardOrder.push(card._id)
                onUpdateColumnState(newColumn)
                setNewCardTitle('')
                toggleOpenNewCardForm()
            })
    }

    return (
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        className="trello-content-editable"
                        onChange={HandleColumnTitleChange}
                        onBlur={HandleColumnTitleBlur}
                        onKeyDown={saveContentAfterPressEnter} //Sử dụng hàm keydown
                        onMouseDown={e => e.preventDefault()} //Khi kéo thay đổi column sẽ bỏ qua việc input value
                        value={columnTitle}
                        spellCheck="false"
                        onClick={selectAllInlineText}
                    />
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown >
                        <Dropdown.Toggle className="dropdown-btn" size="sm" id="dropdown-basic" />
                        <Dropdown.Menu >
                            <Dropdown.Item onClick={toggleOpenNewCardForm}>Add Card</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column</Dropdown.Item>
                            <Dropdown.Item>Move all cards in this column(beta)</Dropdown.Item>
                            <Dropdown.Item>Archive all cards in this column(beta)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className='card-list'>
                <Container
                    groupName='col'
                    onDrop={dropResult => onCardDrop(column._id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview'
                    }}
                    dragClass="card-ghost"
                    drogClass="card-ghost-drop"

                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} onUpdateCard={onUpdateCard} />
                        </Draggable>
                    )
                    )}
                </Container>
                {openNewCardForm &&
                    <div className="add-new-card-area">
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Text Card New..."
                            className="textarea-enter-new-card"
                            as="textarea"
                            rows="3"
                            ref={newCardTextareaRef}
                            value={newCardTitle}
                            onChange={OnNewCardTitleChange}
                            onKeyDown={event => (event.key === 'Enter') && addNewCard()}
                        />
                    </div>
                }
            </div>
            <footer>
                {openNewCardForm ?
                    <div className="add-new-card-actions">
                        <Button variant="success" size="sm" onClick={addNewCard}>
                            Add Card
                        </Button>
                        <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
                            <i className="fa fa-trash icon" />
                        </span>
                    </div>
                    :
                    <div className="footer-actions" onClick={toggleOpenNewCardForm}>
                        <i className="fa fa-plus icon" /> Add another card
                    </div>
                }
            </footer>

            <ConfirmModals
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title='Remove Column'
                content={`Are you sure remove <strong>${column.title}</strong>.<br/>! All related cards will also be removed!`}
            />
        </div>
    )
}

export default Column
