import { KeyboardEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './AddTasks.module.scss';
import { addTask } from '../../redux/tasks/asyncActions';
import DatePicker from 'react-datepicker';
import './DatePicker.scss';
import { setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { DeadlineButton } from '../DeadlineButton';
import { ReminderButton } from '../ReminderButton';
import { Tooltip } from '@chakra-ui/react';

setDefaultLocale('ru');

export const AddTasks = () => {
  const [todoDescription, setTodoDescription] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [showDeadlineCalendar, setShowDeadlineCalendar] = useState(false);
  const [showReminderCalendar, setShowReminderCalendar] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState('');
  const [importantButton, setImportantButton] = useState(false);
  const [importantTask, setImportantTask] = useState(false);

  function handleDeadlineDateChange(date: any) {
    setDeadlineDate(date);
  }
  function handleReminderDateChange(date: any) {
    setReminderDate(date);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as HTMLElement)) {
        setShowDeadlineCalendar(false);
        setShowReminderCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  function addDispatchData() {
    const deadline = String(deadlineDate);
    const reminder = String(reminderDate);
    const important = importantTask;
    dispatch(addTask({ title: todoDescription.trim(), deadline, reminder, important }));
    setTodoDescription('');
    setDeadlineDate(new Date());
    setReminderDate('');
    setImportantButton(false);
  }

  const addButtonHandler = () => {
    if (todoDescription.trim()) {
      addDispatchData();
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnterKey = e.key === 'Enter';
    const isTodoDescriptionValid = todoDescription.trim() !== '';

    if (isEnterKey && isTodoDescriptionValid) {
      addDispatchData();
    }
  };

  const handleCloseCalendar = () => {
    setShowDeadlineCalendar(false);
    setShowReminderCalendar(false);
  };

  const checkReminderDate = (date: string | Date) => {
    if (date === '') {
      return new Date();
    } else {
      return new Date(reminderDate);
    }
  };
  const handleToggleButton = () => {
    !importantButton ? setImportantButton(true) : setImportantButton(false);
    !importantTask ? setImportantTask(true) : setImportantTask(false);
  };

  return (
    <div className={styles.addToTop}>
      <div className={styles.inputWrapper}>
        <span className={styles.circle}> </span>
        <input
          className={styles.addToTopInput}
          type="text"
          placeholder="Добавить задачу"
          maxLength={740}
          value={todoDescription}
          onKeyUp={onKeyUpHandler}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
      </div>

      <div className={styles.addToSet}>
        <span>
          <DeadlineButton
            stylesAddDeadlineButton={styles.addDeadlineButton}
            setShowDeadlineCalendar={setShowDeadlineCalendar}
          />
          <ReminderButton
            stylesAddDeadlineButton={styles.addDeadlineButton}
            setShowReminderCalendar={setShowReminderCalendar}
          />
          {importantButton ? (
            <button
              className={styles.importantButton}
              onClick={() => {
                handleToggleButton();
              }}>
              <Tooltip
                hasArrow
                fontSize="12"
                bg="#fff"
                color="#000"
                padding="5"
                transitionDuration="0.1s"
                label="Отменить важность задачи"
                aria-label="A tooltip">
                <svg
                  className={styles.star}
                  width="16px"
                  height="16px"
                  fill="#fff"
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
              </Tooltip>
            </button>
          ) : (
            <button
              className={styles.importantButton}
              onClick={() => {
                handleToggleButton();
              }}>
              <Tooltip
                hasArrow
                fontSize="12"
                bg="#fff"
                color="#000"
                padding="5"
                transitionDuration="0.1s"
                label="Пометить как важную"
                aria-label="A tooltip">
                <svg
                  className={styles.star}
                  width="16px"
                  height="16px"
                  fill="transparent"
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
              </Tooltip>
            </button>
          )}

          {/* <svg
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
          </svg> */}
        </span>
        {showDeadlineCalendar && (
          <div className={styles.addToTopDatePicker} ref={modalRef}>
            <DatePicker
              selected={deadlineDate}
              onChange={handleDeadlineDateChange}
              onSelect={handleCloseCalendar}
              timeInputLabel="Время:"
              showTimeInput
              dateFormat="MM/dd/yyyy HH:mm"
              timeFormat="HH:mm"
              locale={ru}
              open={true}
            />
          </div>
        )}
        {showReminderCalendar && (
          <div className={styles.addToTopDatePicker} ref={modalRef}>
            <DatePicker
              selected={checkReminderDate(reminderDate)}
              onChange={handleReminderDateChange}
              onSelect={handleCloseCalendar}
              timeInputLabel="Время:"
              showTimeInput
              dateFormat="MM/dd/yyyy HH:mm"
              timeFormat="HH:mm"
              locale={ru}
              open={true}
            />
          </div>
        )}
        <button className={styles.addToSetButton} onClick={addButtonHandler}>
          Добавить
        </button>
      </div>
    </div>
  );
};
