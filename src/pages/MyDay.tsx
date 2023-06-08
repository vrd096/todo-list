import { Tasks } from '../components/Tasks';
import { MyDayHeader } from '../components/MyDayHeader';
import { Todo } from '../redux/tasks/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const MyDay = () => {
  const tasks: Todo[] = useSelector((state: RootState) => state.todos);
  return (
    <div>
      <MyDayHeader />
      <Tasks tasks={tasks} />
    </div>
  );
};
