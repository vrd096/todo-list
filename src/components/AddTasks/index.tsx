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
import SpeechToText from '../SpeechToText';
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
    if (e.key === 'Enter' && todoDescription.trim()) {
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
          <SpeechToText onTextCapture={setTodoDescription} />
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
        <button
          className={styles.addToTopCloseButton}
          onClick={() => {
            setTodoDescription('');
          }}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
            <path
              d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
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
