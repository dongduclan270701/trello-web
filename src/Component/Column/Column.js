import React, { Component } from 'react';

import 'Style/Column.scss'
import Card from 'Component/Card/Card';
import { mapOrder } from 'utils/sorts';

class Column extends Component {
    render() {
        const {column} = this.props;
        const cards = mapOrder(column.cards, column.cardOrder, 'id');
        return (
            <div className="column">
                <header>
                    {column.title}
                </header>
                <ul>
                    {cards.map((card,index)=><Card key={index} card={card}/>)}
                    
                </ul>
                <footer>
                    Add another card
                </footer>
            </div>
        );
    }
}

export default Column;
