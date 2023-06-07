import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './Tasks.module.scss';
import React from 'react';
import {
  addImportant,
  changeToActiveTask,
  changeToCompletedTask,
  fetchTodo,
} from '../../redux/tasks/asyncActions';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AddTasks } from '../AddTasks';
import { ListTasks } from '../ListTasks';
import { Todo } from '../../redux/tasks/types';

export const Tasks = React.memo(() => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
        dispatch(fetchTodo());
      } else {
        setUser(null);
      }
    });
  }, [dispatch]);

  const tasks: Todo[] = useSelector((state: RootState) => state.todos);

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

  return (
    <div className={styles.todo}>
      <AddTasks />
      <ListTasks
        tasks={tasks}
        completedTasks={completedTasks}
        callbackChangeToActiveTask={callbackChangeToActiveTask}
        callbackChangeToCompletedTask={callbackChangeToCompletedTask}
        callbackAddImportant={callbackAddImportant}
      />
    </div>
  );
});
