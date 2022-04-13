import React, { Component } from 'react'
import 'Style/Column.scss'
import Card from 'Component/Card/Card'
import { mapOrder } from 'utils/sorts'
import { Container, Draggable } from 'react-smooth-dnd'

class Column extends Component {

    render() {

        const { column, onCardDrop } = this.props
        const cards = mapOrder(column.cards, column.cardOrder, 'id')
        return (
            <div className="column">
                <header className="column-drag-handle">
                    {column.title}
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
            </div>
        )
    }
}

export default Column
