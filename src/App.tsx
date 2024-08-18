import './scss/app.scss';
import React, { Suspense, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Todolist } from './components/Todolist';

const LazyTaskDetails = React.lazy(
  () => import(/* webpackChunkName: "TaskDetails" */ './components/TaskDetails'),
);

function App() {
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
        <Suspense fallback={<div>Loading…</div>}>
          <LazyTaskDetails />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
