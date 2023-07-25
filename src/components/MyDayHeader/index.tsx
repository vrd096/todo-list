import { Sort } from '../Sort';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import styles from './MyDayHeader.module.scss';
import { toggleSidebar } from '../../redux/sidebar/slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Tooltip } from '@chakra-ui/react';

export const MyDayHeader = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch<AppDispatch>();
  const date = new Date();
  const dayOfWeek = format(date, 'EEEE', { locale: ruLocale });
  const month = format(date, 'LLLL', { locale: ruLocale });
  const dayOfMonth = format(date, 'd', { locale: ruLocale });
  return (
    <div className={styles.header}>
      <h2 className={styles.MyDayTitle}>
        <button className={styles.buttonSidebarOpen}>
          {isSidebarOpen ? (
            <svg
              className={styles.sidebarIsOpen}
              fill="white"
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z"></path>
            </svg>
          ) : (
            <Tooltip
              hasArrow
              fontSize="12"
              bg="#fff"
              color="#000"
              padding="5"
              transitionDuration="0.1s"
              placement="top"
              label="Открыть панель"
              aria-label="A tooltip">
              <svg
                onClick={() => dispatch(toggleSidebar())}
                className={styles.sidebarIsClose}
                viewBox="0 0 32 32"
                fill="transparent"
                height="22"
                width="22">
                <defs></defs>
                <title />
                <g data-name="Layer 2" id="Layer_2" fill="#fff">
                  <path d="M28,10H4A1,1,0,0,1,4,8H28a1,1,0,0,1,0,2Z" />
                  <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                  <path d="M28,24H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                </g>
                <g id="frame">
                  <rect height="32" width="32" />
                </g>
              </svg>
            </Tooltip>
          )}
        </button>

        <span>Мой день</span>
        <p className={styles.data}>
          {month} {dayOfMonth}, {dayOfWeek}
        </p>
      </h2>
      <Sort />
    </div>
  );
};
