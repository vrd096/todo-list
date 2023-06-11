import { Tasks } from '../components/Tasks';
import { MyDayHeader } from '../components/MyDayHeader';
import { Todo } from '../redux/tasks/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const MyDay = () => {
  const tasksData: Todo[] = useSelector((state: RootState) => state.todos);
  const today = new Date();

  const tasks = tasksData.filter((task) => {
    if (task.deadline != undefined) {
      const objDate = new Date(task.deadline);
      return objDate.getDate() == today.getDate();
    }

    // return objDate.getDate() >= today.getDate();
  });

  return (
    <div>
      <MyDayHeader />
      <Tasks tasks={tasks} />
    </div>
  );
};
