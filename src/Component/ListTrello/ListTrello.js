import React, { Component } from 'react';
import 'Style/ListTrello.scss';

import Column from 'Component/Column/Column';

class ListTrello extends Component {
    render() {
        return (
            <nav className="board-colums">
                <Column />
                
            </nav>
        );
    }
}

export default ListTrello;