import { Tasks } from '../components/Tasks';
import { MyDayHeader } from '../components/MyDayHeader';
import { Todo } from '../redux/tasks/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { filterDate } from '../hooks/filterDate';

export const MyDay = () => {
  const tasksData: Todo[] = useSelector((state: RootState) => state.todos);

  const tasksToday = filterDate(tasksData);
  return (
    <div>
      <MyDayHeader />
      <Tasks tasks={tasksToday} />
    </div>
  );
};
