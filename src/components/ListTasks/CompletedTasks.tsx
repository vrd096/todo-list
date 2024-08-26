import React from 'react';
import { TaskActiveButton } from '../TaskActiveButton';
import styles from './ListTasks.module.scss';
import { Todo } from '../../redux/tasks/types';
import ImportanceButton from './ImportanceButton';

interface CompletedTasksProps {
  tasks: Todo[];
  callbackChangeToActiveTask: (task: Todo) => void;
  openTaskDetails: (task: Todo) => void;
  callbackAddImportant: (task: Todo) => void;
  callbackRemoveImportant: (task: Todo) => void;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({
  tasks,
  callbackChangeToActiveTask,
  openTaskDetails,
  callbackAddImportant,
  callbackRemoveImportant,
}) => {
  return (
    <ul className={styles.tasksList}>
      {tasks.map((task) => (
        <li className={styles.taskItem} key={task.id}>
          <div className={styles.titleWrapper}>
            <TaskActiveButton callbackChangeToActiveTask={callbackChangeToActiveTask} task={task} />
            <button className={styles.taskTitleButton} onClick={() => openTaskDetails(task)}>
              <span className={styles.accordionTitle}>{task.title}</span>
            </button>
          </div>
          <ImportanceButton
            task={task}
            callbackAddImportant={callbackAddImportant}
            callbackRemoveImportant={callbackRemoveImportant}
          />
        </li>
      ))}
    </ul>
  );
};

export default CompletedTasks;
