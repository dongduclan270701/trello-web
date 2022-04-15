import React, { useState, useEffect, useCallback } from 'react'
import 'Style/Column.scss'
import Card from 'Component/Card/Card'
import { mapOrder } from 'utils/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import ConfirmModals from 'Component/Common/ConfirmModals'
import { MODAL_ACTION_CONFIRM } from 'utils/constants'
import {selectAllInlineText, saveContentAfterPressEnter} from 'utils/contentEditable'

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

    const HandleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])

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
                            <Dropdown.Item>Add Card</Dropdown.Item>
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

            </div>
            <footer>
                <div className="footer-actions">
                    <i className="fa fa-plus icon" /> Add another card
                </div>
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
