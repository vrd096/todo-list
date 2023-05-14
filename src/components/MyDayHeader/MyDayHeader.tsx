import { Sort } from '../Sort/Sort';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import styles from './MyDayHeader.module.scss';

export const MyDayHeader = () => {
  const date = new Date();
  const dayOfWeek = format(date, 'EEEE', { locale: ruLocale });
  const month = format(date, 'LLLL', { locale: ruLocale });
  const dayOfMonth = format(date, 'd', { locale: ruLocale });
  console.log(dayOfWeek, month, dayOfMonth);
  return (
    <div className={styles.header}>
      <h2>
        <svg
          fill="white"
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z"></path>
        </svg>
        <span>Мой день</span>
        <p className={styles.data}>
          {month}, {dayOfMonth} {dayOfWeek}
        </p>
      </h2>
      <Sort />
    </div>
  );
};
