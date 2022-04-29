import React from 'react'
import 'Style/App.scss'
import Nav from 'Component/Nav/nav'
import Todo from 'Component/Todo/Todo'
import About from 'Component/About/About'
import List from 'Component/TodoList/List'
import BoardBar from 'Component/BoardBar/BoardBar'
import ListTrello from 'Component/ListTrello/ListTrello'
import Nomatch from 'Component/NotFoundPage/NoMatch'
import Detail from 'Component/TodoList/Detail'
import 'Style/Nav.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Home from 'Component/Home/Home'

function App() {
    return (
        <Router>
            <div className="Main">
                <div className="trello-nav">
                    <Nav />
                    <BoardBar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/trello' element={<ListTrello />} />
                        <Route path='/todo' element={<Todo />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/list' element={<List />} />
                        <Route path='/detail/:id' element={<Detail />} />
                        <Route path='*' element={<Nomatch />} />
                    </Routes>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />
            </div>
        </Router>
    )
}

export default App
