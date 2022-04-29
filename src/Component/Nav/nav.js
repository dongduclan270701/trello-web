import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <nav className="navbar app">
                <div className="topnav">
                    <Link to="/" className="active">
                        Home
                    </Link> 
                    <Link to="/trello" className="active">
                        Trello
                    </Link> 
                    <Link to="/todo" className="active">
                        Todo
                    </Link>
                    <Link to="/about" className="active">
                        About
                    </Link>
                    <Link to="/list" className="active">
                        List
                    </Link>
                </div>
            </nav>
            
        )
    }
}

export default Nav
