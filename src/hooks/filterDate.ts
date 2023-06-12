import { Todo } from '../redux/tasks/types';

export function filterDate(tasksData: Todo[]) {
  const today = new Date();
  //   const tasksData: Todo[] = useSelector((state: RootState) => state.todos);

  const tasksToday = tasksData.filter((task) => {
    if (task.deadline != undefined) {
      const taskDeadline = new Date(task.deadline);
      const taskDeadlineDate = `${taskDeadline.getDate()}.${taskDeadline.getMonth()}.${taskDeadline.getFullYear()}`;
      const todayDate = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;

      return taskDeadlineDate == todayDate;
    }
  });
  return tasksToday;
}
