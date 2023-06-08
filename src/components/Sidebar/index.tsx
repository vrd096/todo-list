import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/sidebar/slice';
import classNames from 'classnames';
import { useEffect } from 'react';

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoList = useSelector((state: RootState) => state);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  const maDayTasks = todoList.todos.filter((todo) => todo.completed == false).length;
  const importantTasks = todoList.todos.filter((todo) => todo.important == true).length;
  const allTasks = todoList.todos.filter((todo) => todo.completed == false).length;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 920) {
        dispatch(toggleSidebar());
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div
      className={classNames(
        styles.sideBar,
        { [styles.sideBarOpen]: isSidebarOpen },
        { [styles.sideBarClosed]: !isSidebarOpen },
      )}>
      <svg
        onClick={() => dispatch(toggleSidebar())}
        className={styles.sideBarBurger}
        viewBox="0 0 32 32"
        fill="transparent"
        height="22"
        width="22">
        <defs></defs>
        <title />
        <g data-name="Layer 2" id="Layer_2" fill="currentColor">
          <path d="M28,10H4A1,1,0,0,1,4,8H28a1,1,0,0,1,0,2Z" />
          <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
          <path d="M28,24H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
        </g>
        <g id="frame">
          <rect height="32" width="32" />
        </g>
      </svg>
      <ul className={styles.list}>
        <Link to={'/today'}>
          <li>
            <div className={styles.listItem}>
              <svg
                fill="white"
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z"></path>
              </svg>
              <span> Мой день </span>
            </div>
            <span>{maDayTasks}</span>
          </li>
        </Link>
        <Link to={'/important'}>
          <li>
            <div className={styles.listItem}>
              <svg
                fill="#fff"
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false">
                <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z"></path>
              </svg>
              <span>Важно</span>
            </div>
            <span>{importantTasks}</span>
          </li>
        </Link>
        <Link to={'/inbox'}>
          <li>
            <div className={styles.listItem}>
              <svg
                fill="#fff"
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false">
                <path d="M9 2.39a1.5 1.5 0 012 0l5.5 4.94c.32.28.5.69.5 1.12v7.05c0 .83-.67 1.5-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5V12a.5.5 0 00-.5-.5H9a.5.5 0 00-.5.5v3.5c0 .83-.67 1.5-1.5 1.5H4.5A1.5 1.5 0 013 15.5V8.45c0-.43.18-.84.5-1.12L9 2.39zm1.33.74a.5.5 0 00-.66 0l-5.5 4.94a.5.5 0 00-.17.38v7.05c0 .28.22.5.5.5H7a.5.5 0 00.5-.5V12c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v3.5c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5V8.45a.5.5 0 00-.17-.38l-5.5-4.94z"></path>
              </svg>
              <span>Задачи</span>
            </div>
            <span>{allTasks}</span>
          </li>
        </Link>
        <div className={styles.lastStaticList}></div>
      </ul>
      <div className={styles.addList}>
        <button className={styles.addListButton}>+</button>
        <input className={styles.addListInput} type="text" placeholder="Создать список" />
      </div>
    </div>
  );
};
