import './scss/app.scss';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Todolist } from './components/Todolist';
import { useEffect } from 'react';
import { TaskDetails } from './components/TaskDetails';

function App() {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  useEffect(() => {
    window.process = { ...window.process };
  }, []);

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
      <div className="details">
        <TaskDetails />
      </div>
    </div>
  );
}

export default App;
