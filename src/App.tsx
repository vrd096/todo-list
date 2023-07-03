import './scss/app.scss';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Todolist } from './components/Todolist';
import { useEffect } from 'react';

function App() {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  useEffect(() => {
    window.process = { ...window.process };
  }, []);

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
