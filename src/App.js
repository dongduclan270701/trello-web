import 'Style/App.scss';
import Nav from 'Component/Nav/nav';
import BoardBar from 'Component/BoardBar/BoardBar';
import ListTrello from 'Component/ListTrello/ListTrello';
import 'Style/Nav.scss';

function App() {
  return (
    <div className="Main">
      <div className="trello-nav">
        <Nav/>
        <BoardBar/>
        <ListTrello/>
      </div>

    </div>
  );
}

export default App;
