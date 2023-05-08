import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import styles from './Tasks.module.scss';
import { v1 } from 'uuid';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import React from 'react';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: () => void;
};

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBthLDkbwkqXMUHVGr_ONl-MpOo8CEboQQ',
  authDomain: 'todotimekeeper.firebaseapp.com',
  projectId: 'todotimekeeper',
  storageBucket: 'todotimekeeper.appspot.com',
  messagingSenderId: '1076102409898',
  appId: '1:1076102409898:web:142757f96e24e9311faad3',
  measurementId: 'G-M99G9VDTKJ',
});
const db = getFirestore(firebaseApp);

export const Tasks = React.memo(() => {
  let initTasks: TaskType[] = [
    { id: v1(), title: ' CSS ', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Python', isDone: true },
    { id: v1(), title: 'Golang', isDone: false },
  ];

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const data = querySnapshot.docs.map((doc) => doc.data());

    const task = data.map((item) => item.todo);
    console.log(task);
    setTasks(task);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function removeTask(id: string) {
    let filterTasks = tasks.filter((t) => t.id !== id);
    setTasks(filterTasks);
  }

  const createTask = async () => {
    let newTask = { id: v1(), title: newTaskTitle, isDone: false };
    // let newTasks = [newTask, ...tasks];
    try {
      await addDoc(collection(db, 'todos'), {
        todo: newTask,
      });
      console.log('Document successfully written!');
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push(doc.data());
        fetchData();
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      createTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

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

  // const onAllClickHandler = () => {
  //   changeFilter('all');
  // };
  // const onCompletedClickHandler = () => {
  //   changeFilter('completed');
  // };

  // const onActiveClickHandler = () => {
  //   changeFilter('active');
  // };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  return (
    <div className={styles.todo}>
      <div className={styles.addToTop}>
        <div className={styles.inputWrapper}>
          <span className={styles.circle}> </span>
          <input
            className={styles.input}
            type="text"
            placeholder="Добавить задачу"
            value={newTaskTitle}
            onKeyUp={onKeyUpHandler}
            onChange={onNewTitleChangeHandler}
          />
        </div>

        <div className={styles.addToSet}>
          <span>
            <svg
              width="18px"
              height="18px"
              fill="#fff"
              version="1.1"
              viewBox="0 0 100.353 100.353"
              xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M32.286,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,43.113,33.115,42.441,32.286,42.441z M30.786,52.203h-6.762v-6.762h6.762V52.203z" />
                <path d="M55.054,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,43.113,55.882,42.441,55.054,42.441z M53.554,52.203h-6.762v-6.762h6.762V52.203z" />
                <path d="M77.12,42.441h-9.762c-0.828,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,43.113,77.948,42.441,77.12,42.441z M75.62,52.203h-6.762v-6.762h6.762V52.203z" />
                <path d="M32.286,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,65.349,33.115,64.677,32.286,64.677z M30.786,74.439h-6.762v-6.762h6.762V74.439z" />
                <path d="M55.054,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,65.349,55.882,64.677,55.054,64.677z M53.554,74.439h-6.762v-6.762h6.762V74.439z" />
                <path d="M77.12,64.677h-9.762c-0.828,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,65.349,77.948,64.677,77.12,64.677z M75.62,74.439h-6.762v-6.762h6.762V74.439z" />
                <path d="M89,13.394h-9.907c-0.013,0-0.024,0.003-0.037,0.004V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994   H56.041V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994H33.025V11.4c0-3.268-2.658-5.926-5.926-5.926   s-5.926,2.659-5.926,5.926v1.995c-0.005,0-0.01-0.001-0.015-0.001h-9.905c-0.829,0-1.5,0.671-1.5,1.5V92.64   c0,0.828,0.671,1.5,1.5,1.5H89c0.828,0,1.5-0.672,1.5-1.5V14.894C90.5,14.065,89.828,13.394,89,13.394z M70.204,11.4   c0-1.614,1.312-2.926,2.926-2.926s2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926s-2.926-1.312-2.926-2.926V11.4z    M50.115,8.474c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926c-1.614,0-2.926-1.312-2.926-2.926v-4.643   c0.004-0.047,0.014-0.092,0.014-0.141s-0.01-0.094-0.014-0.141V11.4C47.189,9.786,48.501,8.474,50.115,8.474z M24.173,11.4   c0-1.614,1.312-2.926,2.926-2.926c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926   c-1.614,0-2.926-1.312-2.926-2.926V11.4z M87.5,91.14H12.753V16.394h8.405c0.005,0,0.01-0.001,0.015-0.001v3.285   c0,3.268,2.659,5.926,5.926,5.926s5.926-2.658,5.926-5.926v-3.283h11.164v3.283c0,3.268,2.659,5.926,5.926,5.926   s5.926-2.658,5.926-5.926v-3.283h11.163v3.283c0,3.268,2.658,5.926,5.926,5.926s5.926-2.658,5.926-5.926V16.39   c0.013,0,0.024,0.004,0.037,0.004H87.5V91.14z" />
              </g>
            </svg>

            <svg
              width="18px"
              height="18px"
              fill="#fff"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M16,29a4,4,0,0,1-4-4,1,1,0,0,1,1-1h6a1,1,0,0,1,1,1A4,4,0,0,1,16,29Zm-1.73-3a2,2,0,0,0,3.46,0Z" />
                <path d="M18,7H14a1,1,0,0,1-1-1,3,3,0,0,1,6,0A1,1,0,0,1,18,7ZM16,5h0Z" />
                <path d="M27,26H5a1,1,0,0,1-1-1,7,7,0,0,1,3-5.75V14a9,9,0,0,1,8.94-9h.11a9,9,0,0,1,9,9v5.25A7,7,0,0,1,28,25h0A1,1,0,0,1,27,26ZM6.1,24H25.9a5,5,0,0,0-2.4-3.33,1,1,0,0,1-.5-.87V14A7,7,0,1,0,9,14v5.8a1,1,0,0,1-.5.87A5,5,0,0,0,6.1,24Z" />
              </g>
            </svg>

            <svg
              width="18px"
              height="18px"
              fill="#fff"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 456.559 456.559">
              <g>
                <path
                  d="M351.79,151.874c-3.434,0-6.875-1.308-9.498-3.931c-5.238-5.245-5.238-13.75,0-18.995l53.02-53.006l-53.02-53.013
		c-5.238-5.245-5.238-13.75,0-18.995c5.245-5.245,13.75-5.245,18.995,0l62.511,62.511c2.518,2.518,3.931,5.938,3.931,9.498
		c0,3.56-1.413,6.98-3.931,9.498l-62.511,62.504C358.665,150.566,355.224,151.874,351.79,151.874z"
                />
                <path
                  d="M42.958,227.428c-7.413,0-13.428-6.015-13.428-13.428v-80.932c0-38.907,31.647-70.554,70.554-70.554h314.218
		c7.413,0,13.428,6.015,13.428,13.428c0,7.413-6.015,13.428-13.428,13.428H100.083c-24.094,0-43.697,19.604-43.697,43.697V214
		C56.386,221.414,50.371,227.428,42.958,227.428z"
                />
                <path
                  d="M357.162,394.049H42.258c-7.413,0-13.428-6.015-13.428-13.428s6.015-13.428,13.428-13.428h314.903
		c24.101,0,43.704-19.604,43.704-43.697v-82.534c0-7.413,6.015-13.428,13.428-13.428c7.413,0,13.428,6.015,13.428,13.428v82.534
		C427.722,362.402,396.068,394.049,357.162,394.049z"
                />
                <path
                  d="M104.769,456.559c-3.434,0-6.875-1.308-9.498-3.931l-62.511-62.511c-2.518-2.518-3.931-5.938-3.931-9.498
		s1.413-6.98,3.931-9.498l62.511-62.504c5.245-5.245,13.75-5.245,18.995,0c5.238,5.245,5.238,13.75,0,18.995l-53.02,53.006
		l53.02,53.013c5.238,5.245,5.238,13.75,0,18.995C111.644,455.252,108.203,456.559,104.769,456.559z"
                />
              </g>
            </svg>
          </span>
          <button onClick={addTask}>Добавить</button>
        </div>
      </div>
      <div className={styles.tasks}>
        <div>
          <ul>
            {tasks.map((t) => {
              const onRemoveHandler = () => removeTask(t.id);
              // console.log(tasks);
              return (
                <li className={styles.taskItem} key={t.id}>
                  <div className={styles.titleWrapper}>
                    <button className={styles.circle} onClick={onRemoveHandler}></button>
                    {/* <input type="checkbox" checked={t.isDone} onChange={() => {}} /> */}
                    <span>{t.title}</span>
                  </div>
                  <span className={styles.star}></span>
                  <svg
                    className={styles.star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    strokeWidth="3px"
                    viewBox="0 0 64.00 64.00"
                    enableBackground="new 0 0 64 64">
                    <g id="SVGRepo_bgCarrier"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path>{' '}
                    </g>
                  </svg>
                </li>
              );
            })}
          </ul>
        </div>

        {/* <div>
          <button onClick={onAllClickHandler}>All</button>
          <button onClick={onCompletedClickHandler}>Active</button>
          <button onClick={onActiveClickHandler}>Completed</button>
        </div> */}
      </div>
    </div>
  );
});
