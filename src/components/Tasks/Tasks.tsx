import React from 'react';
import styles from './Tasks.module.scss';
import { FilterValuesType } from '../../pages/MyDay';

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

export const Tasks = (props: PropsType) => {
  return (
    <div className={styles.todo}>
      <h3 className={styles.title}>{props.title} title</h3>
      <div>
        <input />
        <button></button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}>
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter('all');
          }}>
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter('completed');
          }}>
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter('active');
          }}>
          Completed
        </button>
      </div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta libero aspernatur quam ex
        error voluptatibus ducimus, vitae sunt nisi vel eum deserunt architecto itaque omnis
        repellendus a quia optio fugiat.
      </p>
    </div>
  );
};
