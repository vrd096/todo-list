import { useDispatch, useSelector } from 'react-redux';
import { Sort } from '../Sort';
import styles from './ImportantHeader.module.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/sidebar/slice';
import { Tooltip } from '@chakra-ui/react';

export const ImportantHeader = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.header}>
      <h2 className={styles.ImportantTitle}>
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
              <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z"></path>
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

        <span>Важное</span>
      </h2>
      {/* <Sort /> */}
    </div>
  );
};
