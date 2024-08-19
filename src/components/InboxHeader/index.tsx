import { useDispatch, useSelector } from 'react-redux';
import styles from './InboxHeader.module.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/sidebar/slice';
import { Tooltip } from '@chakra-ui/react';
import React from 'react';

export const InboxHeader = React.memo(() => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.header}>
      <h2 className={styles.InboxTitle}>
        <button className={styles.buttonSidebarOpen}>
          {isSidebarOpen ? (
            <svg
              className={styles.sidebarIsOpen}
              fill="#78bafd"
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false">
              <path d="M9 2.39a1.5 1.5 0 012 0l5.5 4.94c.32.28.5.69.5 1.12v7.05c0 .83-.67 1.5-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5V12a.5.5 0 00-.5-.5H9a.5.5 0 00-.5.5v3.5c0 .83-.67 1.5-1.5 1.5H4.5A1.5 1.5 0 013 15.5V8.45c0-.43.18-.84.5-1.12L9 2.39zm1.33.74a.5.5 0 00-.66 0l-5.5 4.94a.5.5 0 00-.17.38v7.05c0 .28.22.5.5.5H7a.5.5 0 00.5-.5V12c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v3.5c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5V8.45a.5.5 0 00-.17-.38l-5.5-4.94z"></path>
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

        <span>Все задачи</span>
      </h2>
    </div>
  );
});
