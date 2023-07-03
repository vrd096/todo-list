import { Todo } from '../redux/tasks/types';

export const filterReminder = (tasksData: Todo[]) => {
  const today = new Date();
  // console.log(today.getTime());
  const tasksToday = tasksData.filter((task) => {
    if (task.reminder != undefined) {
      const taskReminder = new Date(task.reminder);

      const taskReminderDate = `${taskReminder.getDate()}.${taskReminder.getMonth()}.${taskReminder.getFullYear()}.${taskReminder.getHours()}:${taskReminder.getMinutes()}`;
      const todayDate = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}.${taskReminder.getHours()}:${taskReminder.getMinutes()}`;

      //   console.log(taskReminder);
      //   console.log(today);
      //   console.log(taskReminder >= today);

      return taskReminder < today;
    }

    return false;
  });

  if (tasksToday.length === 0) {
    return [];
  }
  return tasksToday;
};
