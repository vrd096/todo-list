import { Tasks } from '../components/Tasks';
import { MyDayHeader } from '../components/MyDayHeader';
import { Todo } from '../redux/tasks/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { filterDate } from '../hooks/filterDate';
import { filterReminder } from '../hooks/filterReminder';
import { useEffect } from 'react';
import { fetchTodo } from '../redux/tasks/asyncActions';

export const MyDay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasksData: Todo[] = useSelector((state: RootState) => state.todos);

  // setInterval(() => {
  //   dispatch(fetchTodo());
  // }, 15000);

  // console.log(filterReminder(tasksData));
  const tasksToday = filterDate(tasksData);
  return (
    <div>
      <MyDayHeader />
      <Tasks tasks={tasksToday} />
    </div>
  );
};
