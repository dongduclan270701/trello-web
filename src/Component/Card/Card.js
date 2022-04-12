import React, { Component } from 'react';
import Image from "assets/Image/Logo.png"
import 'Style/Card.scss'

class Task extends Component {
    render() {
        const {card} = this.props
        return (
            <li>
                {card.cover && <img src={card.cover} alt='imag' />}
                {card.title}
            </li>
        );
    }
}

export default Task;
