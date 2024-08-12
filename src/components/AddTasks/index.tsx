import { KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './AddTasks.module.scss';
import { addTask } from '../../redux/tasks/asyncActions';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import './DatePicker.scss';
import { setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { DeadlineButton } from '../DeadlineButton';
import { ReminderButton } from '../ReminderButton';
import { Tooltip } from '@chakra-ui/react';
import MobilePicker from '../MobilePicker';
import classNames from 'classnames';

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

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (modalRef.current && !modalRef.current.contains(e.target as HTMLElement)) {
  //       setShowDeadlineCalendar(false);
  //       setShowReminderCalendar(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [modalRef]);

  function addDispatchData() {
    const deadline = String(deadlineDate);
    const reminder = String(reminderDate);
    const important = importantTask;
    dispatch(addTask({ title: todoDescription.trim(), deadline, reminder, important }));
    setTodoDescription('');
    setDeadlineDate(new Date());
    setReminderDate('');
    setImportantButton(false);
    setImportantTask(false);
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
  const CustomInputDeadline = forwardRef<HTMLButtonElement, {}>(({ onClick }: any, ref) => (
    <Tooltip
      hasArrow
      fontSize="12"
      bg="#fff"
      color="#000"
      padding="5"
      transitionDuration="0.1s"
      label="Установить срок задачи"
      aria-label="A tooltip">
      <button className={styles.addToSetCalendarButton} onClick={onClick} ref={ref}>
        Срок задачи
      </button>
    </Tooltip>
  ));

  const CustomInputReminder = forwardRef<HTMLButtonElement, {}>(({ onClick }: any, ref) => (
    <Tooltip
      hasArrow
      fontSize="12"
      bg="#fff"
      color="#000"
      padding="5"
      transitionDuration="0.1s"
      label="Установить напоминание задачи"
      aria-label="A tooltip">
      <button className={styles.addToSetCalendarButton} onClick={onClick} ref={ref}>
        Напомнить
      </button>
    </Tooltip>
  ));
  const datePickerContainer = ({ children }: any) => {
    return (
      <CalendarContainer className={styles.datePickerContainer}>
        <button className={styles.datePickerContainerButton}>Закрыть</button>
        <div style={{ position: 'relative' }}>{children}</div>
      </CalendarContainer>
    );
  };

  return (
    <div className={styles.addToTop}>
      <div className={styles.inputWrapper}>
        <span className={styles.addToTopSpan}>
          {' '}
          <svg
            width="24px"
            height="24px"
            // viewBox="0 0 24 24"
            fill="#78bafd"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
            />
          </svg>{' '}
        </span>
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
        <div className={styles.setCalendarWrapper}>
          {window.innerWidth < 1024 ? (
            <DeadlineButton
              stylesAddDeadlineButton={styles.addDeadlineButton}
              setShowDeadlineCalendar={setShowDeadlineCalendar}
            />
          ) : (
            <DatePicker
              selected={deadlineDate}
              onChange={handleDeadlineDateChange}
              // onSelect={handleCloseCalendar}
              // timeInputLabel="Время:"
              minDate={new Date()}
              dateFormat="MM/dd/yyyy HH:mm"
              timeFormat="HH:mm"
              locale={ru}
              showTimeSelect
              timeCaption="Время"
              timeIntervals={15}
              // inline
              withPortal
              customInput={<CustomInputDeadline />}
              portalId="root-portal"
              shouldCloseOnSelect={true}
              open={true}
              // calendarContainer={datePickerContainer}
              // onClickOutside={() => setShowDeadlineCalendar(false)}
              // onInputClick={() => setShowDeadlineCalendar(true)}
            />
          )}
          {window.innerWidth < 1024 ? (
            <ReminderButton
              stylesAddDeadlineButton={styles.addDeadlineButton}
              setShowReminderCalendar={setShowReminderCalendar}
            />
          ) : (
            <DatePicker
              selected={checkReminderDate(reminderDate)}
              onChange={handleReminderDateChange}
              // onSelect={handleCloseCalendar}
              // timeInputLabel="Время:"
              minDate={new Date()}
              dateFormat="MM/dd/yyyy HH:mm"
              timeFormat="HH:mm"
              locale={ru}
              showTimeSelect
              timeCaption="Время"
              timeIntervals={15}
              // inline
              withPortal
              customInput={<CustomInputReminder />}
              portalId="root-portal"
              shouldCloseOnSelect={true}
              open={true}
              // onClickOutside={() => setShowDeadlineCalendar(false)}
              // onInputClick={() => setShowDeadlineCalendar(true)}
            />
          )}
          {window.innerWidth < 1024 ? (
            importantButton ? (
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
            )
          ) : importantButton ? (
            <Tooltip
              hasArrow
              fontSize="12"
              bg="#fff"
              color="#000"
              padding="5"
              transitionDuration="0.1s"
              label="Отменить важность задачи"
              aria-label="A tooltip">
              <button
                className={classNames(
                  styles.addToSetCalendarButton,
                  styles.addToSetCalendarButtonActive,
                )}
                onClick={() => {
                  handleToggleButton();
                }}>
                Важность
              </button>
            </Tooltip>
          ) : (
            <Tooltip
              hasArrow
              fontSize="12"
              bg="#fff"
              color="#000"
              padding="5"
              transitionDuration="0.1s"
              label="Сделать задачу важной"
              aria-label="A tooltip">
              <button
                className={styles.addToSetCalendarButton}
                onClick={() => {
                  handleToggleButton();
                }}>
                Важность
              </button>
            </Tooltip>
          )}
        </div>
        {showDeadlineCalendar && (
          <div className={styles.addToTopDatePicker} ref={modalRef}>
            {window.innerWidth < 1024 && (
              <MobilePicker
                onChange={handleDeadlineDateChange}
                closeCalendar={handleCloseCalendar}
              />
            )}
          </div>
        )}
        {showReminderCalendar && (
          <div className={styles.addToTopDatePicker} ref={modalRef}>
            {window.innerWidth < 1024 && (
              <MobilePicker
                onChange={handleReminderDateChange}
                closeCalendar={handleCloseCalendar}
              />
            )}
          </div>
        )}
        <button className={styles.addToSetButton} onClick={addButtonHandler}>
          Добавить
        </button>
      </div>
    </div>
  );
};
