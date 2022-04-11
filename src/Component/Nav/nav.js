import React, { Component } from 'react';
import '../Style/Nav.scss';
import ListTrello from '../ListTrello/ListTrello';
import BoardBar from '../BoardBar/BoardBar';

class Nav extends Component {
    render() {
        return (
            <div className="trello-nav">
                <nav className="navbar app">App Bar</nav>
                <BoardBar/>
                <ListTrello/>
            </div>
        );
    }
}

export default Nav;
