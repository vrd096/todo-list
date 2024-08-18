import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './Tasks.module.scss';

import { fetchTodo, toggleCompletedTask, toggleImportant } from '../../redux/tasks/asyncActions';

import { AddTasks } from '../AddTasks';
import { ListTasks } from '../ListTasks';
import { PropsTasks, Todo } from '../../redux/tasks/types';
import { onAuthStateChanged } from '../../firebase';
import { User } from 'firebase/auth';
import { dataTaskDetails, openDetails } from '../../redux/taskDetails/slice';

export const Tasks = ({ tasks }: PropsTasks) => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let unsubscribe: () => void;

    const initializeFirebase = async () => {
      unsubscribe = await onAuthStateChanged(async (user: User | null) => {
        setUser(user);
        if (user) {
          try {
            await dispatch(fetchTodo());
          } catch (error) {
            console.error(error);
          }
        }
      });
    };

    initializeFirebase();

    return () => {
      if (unsubscribe) {
        unsubscribe(); // Отписываемся корректно
      }
    };
  }, [dispatch]);

  const completedTasks = tasks.filter((todo) => todo.completed).length;

  // Коллбек для изменения статуса задачи
  const handleToggleCompleted = (task: Todo) => {
    dispatch(toggleCompletedTask(task));
  };

  // Коллбек для изменения статуса важности задачи
  const handleToggleImportant = (task: Todo) => {
    dispatch(toggleImportant(task));
  };

  // Коллбек для открытия деталей задачи
  const handleOpenTaskDetails = (task: Todo) => {
    dispatch(dataTaskDetails(task));
    dispatch(openDetails());
  };

  return (
    <div className={styles.tasksWrapper}>
      <AddTasks />
      <ListTasks
        tasks={tasks}
        completedTasks={completedTasks}
        callbackChangeToActiveTask={handleToggleCompleted}
        callbackChangeToCompletedTask={handleToggleCompleted}
        callbackAddImportant={handleToggleImportant}
        callbackRemoveImportant={handleToggleImportant}
        openTaskDetails={handleOpenTaskDetails}
      />
    </div>
  );
};
