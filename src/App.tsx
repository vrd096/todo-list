import './scss/app.scss';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Todolist } from './components/Todolist/Todolist';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  return (
    <div className={`app ${isSidebarOpen ? 'app-open' : 'app-closed'}`}>
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
