import React from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Todolist } from '../components/Todolist/Todolist';

export const Inbox = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <Todolist />
    </div>
  );
};
