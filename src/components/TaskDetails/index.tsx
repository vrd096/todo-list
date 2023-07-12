import React, { useEffect, useState } from 'react';
import styles from './TaskDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Todo } from '../../redux/tasks/types';
import classNames from 'classnames';
import { toggleTaskDetails } from '../../redux/taskDetails/slice';
import { TaskCompletionButton } from '../TaskCompletionButton';
import TextareaAutosize from 'react-textarea-autosize';

export const TaskDetails = () => {
  const task: any = useSelector((state: RootState) => state.taskDetails.data);
  const dispatch = useDispatch<AppDispatch>();
  const isDetailsOpen: boolean = useSelector((state: RootState) => state.taskDetails.isDetailsOpen);
  const [inputValue, setInputValue] = useState(task.title);

  useEffect(() => {
    setInputValue(task.title);
  }, [task]);

  console.log(task.title);
  return (
    <div
      className={classNames(
        styles.detailsWrapper,
        { [styles.detailsOpen]: isDetailsOpen },
        { [styles.detailsClosed]: !isDetailsOpen },
      )}>
      <div className={styles.detailsBody}>
        <div className={styles.titleWrapper}>
          <TaskCompletionButton
          // callbackChangeToCompletedTask={callbackChangeToCompletedTask}
          // task={task}
          />
          <TextareaAutosize
            className={styles.detailsBodyInput}
            draggable="false"
            maxLength={740}
            value={inputValue}
            // onKeyUp={onKeyUpHandler}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {!task.important ? (
            <button
              className={styles.importantButton}
              onClick={() => {
                // callbackAddImportant(task);
              }}>
              <svg
                className={styles.star}
                width="16px"
                height="16px"
                fill="#252423"
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
            </button>
          ) : (
            <button
              className={styles.importantButton}
              onClick={() => {
                // callbackRemoveImportant(task);
              }}>
              <svg
                className={styles.star}
                width="16px"
                height="16px"
                fill="#78bafd"
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
            </button>
          )}
        </div>
        <div className={styles.managingStatusTasks}>
          <button>Добавление в "Мой день"</button>
          <button>Напомнить</button>
          <button>Добавить дату выполнения</button>
        </div>
      </div>
      <div className={styles.detailsFooter}>
        <button onClick={() => dispatch(toggleTaskDetails())}>скрыть меню</button>
        <p>создано вт, 13 июля</p>
        <button>корзина</button>
      </div>
    </div>
  );
};
