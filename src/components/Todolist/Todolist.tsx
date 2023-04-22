import { useState } from 'react';
import { TodoHeader } from '../TodoHeader';
import { PropsType, TaskType, Tasks } from '../Tasks/Tasks';
import styles from './Todolist.module.scss';
import { Route, Routes } from 'react-router-dom';
import { MyDay } from '../../pages/MyDay';
import { Important } from '../../pages/Important';
import { Inbox } from '../../pages/Inbox';

// export type FilterValuesType = 'all' | 'completed' | 'active';

export const Todolist = () => {
  // let initTasks: TaskType[] = [
  //   { id: 1, title: 'CSS', isDone: true },
  //   { id: 2, title: 'JS', isDone: true },
  //   { id: 4, title: 'React', isDone: false },
  //   { id: 5, title: 'React', isDone: false },
  //   { id: 6, title: 'React', isDone: false },
  // ];
  // const [tasks, setTasks] = useState(initTasks);
  // const [filter, setFilter] = useState<FilterValuesType>('all');

  // function removeTask(id: number) {
  //   let filterTasks = tasks.filter((t) => t.id !== id);
  //   setTasks(filterTasks);
  // }

  // function changeFilter(value: FilterValuesType) {
  //   setFilter(value);
  // }

  // let taskForTodolist = tasks;
  // if (filter === 'completed') {
  //   taskForTodolist = tasks.filter((t) => t.isDone === true);
  // }
  // if (filter === 'active') {
  //   taskForTodolist = tasks.filter((t) => t.isDone === false);
  // }
  return (
    <div className={styles.todo}>
      <Routes>
        <Route path="/today" element={<MyDay />} />
        <Route path="/important" element={<Important />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
};
