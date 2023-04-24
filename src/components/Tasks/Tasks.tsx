import { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import styles from './Tasks.module.scss';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export const Tasks = () => {
  let initTasks: TaskType[] = [
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 4, title: 'React', isDone: false },
    { id: 5, title: 'React', isDone: true },
    { id: 6, title: 'React', isDone: false },
  ];
  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(id: number) {
    let filterTasks = tasks.filter((t) => t.id !== id);
    setTasks(filterTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let taskForTodolist = tasks;
  if (filter === 'completed') {
    taskForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    taskForTodolist = tasks.filter((t) => t.isDone === false);
  }
  console.log(tasks);
  return (
    <div className={styles.todo}>
      <div className={styles.addToTop}>
        <input />
        <button></button>
      </div>
      <div className={styles.tasks}>
        {/* <Scrollbar className={styles.scrollBar}> */}
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button
                onClick={() => {
                  removeTask(t.id);
                }}>
                X
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button
            onClick={() => {
              changeFilter('all');
            }}>
            All
          </button>
          <button
            onClick={() => {
              changeFilter('completed');
            }}>
            Active
          </button>
          <button
            onClick={() => {
              changeFilter('active');
            }}>
            Completed
          </button>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam
            ex error voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat. Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat. Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat. Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex error
            voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
            repellendus a quia optio fugiat.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Soluta libero aspernatur quam ex error voluptatibus ducimus, vitae sunt nisi vel
            eum deserunt architecto itaque omnis repellendus a quia optio fugiat.
          </p>
        </div>
        {/* </Scrollbar> */}
      </div>
    </div>
  );
};
