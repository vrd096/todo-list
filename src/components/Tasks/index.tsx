import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './Tasks.module.scss';

import { fetchTodo, toggleCompletedTask, toggleImportant } from '../../redux/tasks/asyncActions';

import { AddTasks } from '../AddTasks';
import { ListTasks } from '../ListTasks';
import { PropsTasks, Todo } from '../../redux/tasks/types';
import { auth, onAuthStateChanged } from '../../firebase';
import { User } from 'firebase/auth';
import { dataTaskDetails, openDetails } from '../../redux/taskDetails/slice';

export const Tasks = ({ tasks }: PropsTasks) => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeFirebase = async () => {
      const unsubscribe = await onAuthStateChanged(async (user: User | null) => {
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

      return () => {
        if (unsubscribe) unsubscribe();
      };
    };

    initializeFirebase();
  }, [dispatch]);

  const completedTasks = tasks.filter((todo) => todo.completed).length;

  const callbackChangeToCompletedTask = (task: Todo) => {
    dispatch(toggleCompletedTask(task));
  };

  const callbackChangeToActiveTask = (task: Todo) => {
    dispatch(toggleCompletedTask(task));
  };

  const callbackAddImportant = (task: Todo) => {
    dispatch(toggleImportant(task));
  };

  const callbackRemoveImportant = (task: Todo) => {
    dispatch(toggleImportant(task));
  };

  const openTaskDetails = (task: Todo) => {
    dispatch(dataTaskDetails(task));
    dispatch(openDetails());
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
        openTaskDetails={openTaskDetails}
      />
    </div>
  );
};
