import React, { useState, useEffect, useRef } from 'react'
import 'Style/Column.scss'
import Card from 'Component/Card/Card'
import { mapOrder } from 'utils/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import ConfirmModals from 'Component/Common/ConfirmModals'
import { MODAL_ACTION_CONFIRM } from 'utils/constants'
import { selectAllInlineText, saveContentAfterPressEnter } from 'utils/contentEditable'
import { cloneDeep } from 'lodash'

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

    const [columnTitle, setColumnTitle] = useState('')
    const HandleColumnTitleChange = (e) => setColumnTitle(e.target.value)

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm)
    }

    const newCardTextareaRef = useRef(null)

    const [newCardTitle, setNewCardTitle] = useState('')
    const OnNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])

    useEffect(() => {
        if (newCardTextareaRef && newCardTextareaRef.current) {
            newCardTextareaRef.current.focus()
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
            onUpdateColumn(newColumn)
        }
        toggleShowConfirmModal()
    }

    const HandleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)
    }

    const addNewCard = () => {
        if (!newCardTitle) {
            newCardTextareaRef.current.focus()
            return
        }

        const newCardToAdd = {
            id: Math.random().toString(36).substr(2, 5), // 5 random characters, will remove when we implement code api
            boardId: column.boardID,
            columnId: column.id,
            title: newCardTitle.trim(),
            cover: null
        }

        let newColumn = cloneDeep(column)
        newColumn.cards.push(newCardToAdd)
        newColumn.cardOrder.push(newCardToAdd.id)

        // console.log(newColumn)

        onUpdateColumn(newColumn)
        setNewCardTitle('')
        toggleOpenNewCardForm()
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
                        onKeyDown={saveContentAfterPressEnter}
                        onMouseDown={e => e.preventDefault()}
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
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
                            <Card card={card} />
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
                {openNewCardForm &&
                    <div className="add-new-card-actions">
                        <Button variant="success" size="sm" onClick={addNewCard}>
                            Add Card
                        </Button>
                        <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
                            <i className="fa fa-trash icon" />
                        </span>
                    </div>
                }
                {!openNewCardForm &&
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
