import { useDispatch, useSelector } from 'react-redux';
import styles from './ImportantHeader.module.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/sidebar/slice';
import React from 'react';
import SidebarIcon from './SidebarIcon';

export const ImportantHeader = React.memo(() => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch<AppDispatch>();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={styles.header}>
      <h2 className={styles.ImportantTitle}>
        <button className={styles.buttonSidebarOpen}>
          <SidebarIcon isOpen={isSidebarOpen} onClick={handleSidebarToggle} />
        </button>
        <span>Важное</span>
      </h2>
    </div>
  );
});
