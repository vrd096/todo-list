import React, { useEffect, useState } from 'react';
import styles from './TaskDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Todo } from '../../redux/tasks/types';
import classNames from 'classnames';
import { toggleTaskDetails } from '../../redux/taskDetails/slice';
import { TaskCompletionButton } from '../TaskCompletionButton';
import TextareaAutosize from 'react-textarea-autosize';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

export const TaskDetails = () => {
  const task: any = useSelector((state: RootState) => state.taskDetails.data);
  const dispatch = useDispatch<AppDispatch>();
  const isDetailsOpen: boolean = useSelector((state: RootState) => state.taskDetails.isDetailsOpen);
  const [inputValue, setInputValue] = useState(task.title);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [month, setMonth] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState('');
  // const date = task.dateСreated;
  // const dayOfWeek = format(date, 'EEEE', { locale: ruLocale });
  // const month = format(date, 'LLLL', { locale: ruLocale });
  // const dayOfMonth = format(date, 'd', { locale: ruLocale });

  useEffect(() => {
    setInputValue(task.title);
  }, [task]);

  useEffect(() => {
    if (task.dateСreated != undefined) {
      const date = new Date(task.dateСreated);
      setDayOfWeek(format(date, 'EEEEEE', { locale: ruLocale }));
      setMonth(format(date, 'MMMM', { locale: ruLocale }));
      setDayOfMonth(format(date, 'dd', { locale: ruLocale }));
      console.log(month);
    }
  }, [task]);

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
          <button>
            <svg
              aria-hidden="true"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z"></path>
            </svg>
            Добавление в "Мой день"
          </button>
          <button>
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
            Добавить дату выполнения{' '}
          </button>
          <button>
            <svg width="18px" height="18px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M16,29a4,4,0,0,1-4-4,1,1,0,0,1,1-1h6a1,1,0,0,1,1,1A4,4,0,0,1,16,29Zm-1.73-3a2,2,0,0,0,3.46,0Z" />
                <path d="M18,7H14a1,1,0,0,1-1-1,3,3,0,0,1,6,0A1,1,0,0,1,18,7ZM16,5h0Z" />
                <path d="M27,26H5a1,1,0,0,1-1-1,7,7,0,0,1,3-5.75V14a9,9,0,0,1,8.94-9h.11a9,9,0,0,1,9,9v5.25A7,7,0,0,1,28,25h0A1,1,0,0,1,27,26ZM6.1,24H25.9a5,5,0,0,0-2.4-3.33,1,1,0,0,1-.5-.87V14A7,7,0,1,0,9,14v5.8a1,1,0,0,1-.5.87A5,5,0,0,0,6.1,24Z" />
              </g>
            </svg>
            Напомнить
          </button>
        </div>
      </div>
      <div className={styles.detailsFooter}>
        <button onClick={() => dispatch(toggleTaskDetails())}>
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 12L10 6M4 12L10 18M4 12H14.5M20 12H17.5"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p>
          Cоздано {`${dayOfWeek}`}, {` ${month}  ${dayOfMonth}`}
        </p>
        <button>
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5001 6H3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9.5 11L10 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14.5 11L14 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <path
              d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
