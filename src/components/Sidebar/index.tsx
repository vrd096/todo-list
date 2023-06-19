import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/sidebar/slice';
import { useCallback, useEffect } from 'react';
import { filterDate } from '../../hooks/filterDate';
import { Todo } from '../../redux/tasks/types';
import { Dispatch } from 'redux';
import { SidebarComponent } from './SidebarComponent';

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasksData: Todo[] = useSelector((state: RootState) => state.todos);
  const isSidebarOpen: boolean = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  const maDayTasks: number = filterDate(tasksData).filter(
    (todo: { completed: boolean }) => !todo.completed,
  ).length;

  const importantTasks: number = tasksData.filter(
    (todo) => todo.important && !todo.completed,
  ).length;

  const allTasks: number = tasksData.filter((todo) => !todo.completed).length;

  function handleResize(dispatch: Dispatch) {
    if (window.innerWidth < 920) {
      dispatch(toggleSidebar());
    }
  }

  function useResizeListener(dispatch: Dispatch) {
    const memoizedHandleResize = useCallback(() => handleResize(dispatch), [dispatch]);

    useEffect(() => {
      memoizedHandleResize();
      window.addEventListener('resize', memoizedHandleResize);

      return () => window.removeEventListener('resize', memoizedHandleResize);
    }, [memoizedHandleResize]);
  }

  useResizeListener(dispatch);

  return (
    <SidebarComponent
      maDayTasks={maDayTasks}
      isSidebarOpen={isSidebarOpen}
      importantTasks={importantTasks}
      allTasks={allTasks}
    />
  );
};
