import React, { Component } from 'react';

import 'Style/Column.scss'
import Task from 'Component/Task/Task';

class Column extends Component {
    render() {
        return (
            <div className="column">
                <header>
                    Brainstorm
                </header>
                <ul>
                    <Task/>
                <li>
                    Title : KassDev
                </li>
                <li>
                    Title : KassDev
                </li>
                <li>
                    Title : KassDev
                </li>
                <li>
                    Title : KassDev
                </li>
                <li>
                    Title : KassDev
                </li>
                <li>
                    Title : KassDev
                </li>
                </ul>
                <footer>
                    Add another card
                </footer>
            </div>
        );
    }
}

export default Column;
