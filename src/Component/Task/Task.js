import React, { Component } from 'react';
import Image from "assets/Image/Logo.png"
import 'Style/Task.scss'

class Task extends Component {
    render() {
        return (
            <li>
                <img src={Image} alt='imag' />
                Title : KassDev
            </li>
        );
    }
}

export default Task;
