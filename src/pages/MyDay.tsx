import { Tasks } from '../components/Tasks';
import { MyDayHeader } from '../components/MyDayHeader';
import { Todo } from '../redux/tasks/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const MyDay = () => {
  const tasksData: Todo[] = useSelector((state: RootState) => state.todos);
  const today = new Date();

  const tasksToday = tasksData.filter((task) => {
    if (task.deadline != undefined) {
      const taskDeadline = new Date(task.deadline);
      const taskDeadlineDate = `${taskDeadline.getDate()}.${taskDeadline.getMonth()}.${taskDeadline.getFullYear()}`;
      const todayDate = `${taskDeadline.getDate()}.${taskDeadline.getMonth()}.${taskDeadline.getFullYear()}`;

      return taskDeadlineDate == todayDate;
    }

    // return taskDeadline.getDate() >= today.getDate();
  });

  return (
    <div>
      <MyDayHeader />
      <Tasks tasks={tasksToday} />
    </div>
  );
};
