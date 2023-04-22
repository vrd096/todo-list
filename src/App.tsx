import { useState } from 'react';
import './scss/app.scss';
import { Header } from './components/Header/Header';
import { MyDay } from './pages/MyDay';
import { Route, Routes } from 'react-router-dom';
import { Important } from './pages/Important';
import { Inbox } from './pages/Inbox';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Todolist } from './components/Todolist/Todolist';

function App() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <Todolist />
    </div>
  );
}

export default App;
