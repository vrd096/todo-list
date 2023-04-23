import './scss/app.scss';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Todolist } from './components/Todolist/Todolist';

function App() {
  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Todolist />
      </div>
    </div>
  );
}

export default App;
