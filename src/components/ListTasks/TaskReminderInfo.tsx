import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
export const TaskReminderInfo = ({ task, styles }: any) => {
  const [dateTask, setDateTask] = useState({
    hourReminder: '',
    minuteReminder: '',
    dayOfWeekReminder: '',
    monthDateReminder: '',
    dayOfMonthReminder: '',
  });
  useEffect(() => {
    if (task.reminder !== '' && task.reminder !== undefined) {
      const date = new Date(task.reminder);

      setDateTask((prev) => ({
        ...prev,
        hourReminder: format(date, 'H', { locale: ruLocale }),
        minuteReminder: format(date, 'mm', { locale: ruLocale }),
        dayOfWeekReminder: format(date, 'EEEEEE', { locale: ruLocale }),
        monthDateReminder: format(date, 'MMMM', { locale: ruLocale }),
        dayOfMonthReminder: format(date, 'dd', { locale: ruLocale }),
      }));
    }
  }, [task]);
  return (
    <span>
      {task.reminder !== '' && (
        <span>
          <svg
            className={styles}
            width="14px"
            height="14px"
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
          {`${dateTask.dayOfWeekReminder}, ${dateTask.dayOfMonthReminder} ${dateTask.monthDateReminder} `}
        </span>
      )}
    </span>
  );
};
