import React, { Component } from 'react'
import 'Style/Card.scss'
class Task extends Component {
    render() {
        const { card } = this.props
        return (
            <div className='card-item'>
                {card.cover && <img src={card.cover} alt='imag' />}
                {card.title}
            </div>
        )
    }
}

export default Task
