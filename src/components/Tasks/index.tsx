import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './Tasks.module.scss';

import {
  addImportant,
  changeToActiveTask,
  changeToCompletedTask,
  fetchTodo,
  removeImportant,
} from '../../redux/tasks/asyncActions';

import { AddTasks } from '../AddTasks';
import { ListTasks } from '../ListTasks';
import { PropsTasks, Todo } from '../../redux/tasks/types';
import { auth, onAuthStateChanged } from '../../firebase';
import { User } from 'firebase/auth';

export const Tasks = ({ tasks }: PropsTasks) => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setUser(user);
        try {
          await dispatch(fetchTodo());
        } catch (error) {
          console.error(error);
        }
      } else {
        setUser(null);
      }
    });
  }, [dispatch]);

  // const tasks: Todo[] = useSelector((state: RootState) => state.todos);

  const completedTasks = tasks.filter((todo) => todo.completed == true).length;

  const callbackChangeToCompletedTask = (task: Todo) => {
    dispatch(changeToCompletedTask(task));
  };
  const callbackChangeToActiveTask = (task: Todo) => {
    dispatch(changeToActiveTask(task));
  };
  const callbackAddImportant = (task: Todo) => {
    dispatch(addImportant(task));
  };
  const callbackRemoveImportant = (task: Todo) => {
    dispatch(removeImportant(task));
  };

  return (
    <div className={styles.tasksWrapper}>
      <AddTasks />
      <ListTasks
        tasks={tasks}
        completedTasks={completedTasks}
        callbackChangeToActiveTask={callbackChangeToActiveTask}
        callbackChangeToCompletedTask={callbackChangeToCompletedTask}
        callbackAddImportant={callbackAddImportant}
        callbackRemoveImportant={callbackRemoveImportant}
      />
    </div>
  );
};
