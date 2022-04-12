import React, { useState, useEffect } from 'react';
import 'Style/ListTrello.scss';
import { initialData } from 'actions/initialData';
import Column from 'Component/Column/Column';
import { isEmpty } from 'lodash';
import { mapOrder } from 'utils/sorts';

const Listtrello = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            //sort column

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, []);

    if (isEmpty(board)) {
        return <div className="not-found">Board not Found!!</div>
    }
    return (
        <nav className="board-colums">
            {columns.map((column, index) => <Column key={index} column={column} />)}
        </nav>
    );
}

export default Listtrello;
