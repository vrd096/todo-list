import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const ITEMS_PER_PAGE = 20;

const CompletedTasks: React.FC<CompletedTasksProps> = ({
  tasks,
  callbackChangeToActiveTask,
  openTaskDetails,
  callbackAddImportant,
  callbackRemoveImportant,
}) => {
  const [currentTasks, setCurrentTasks] = useState<Todo[]>([]);
  const [page, setPage] = useState(1); // Start with the first page
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTaskRef = useRef<HTMLLIElement | null>(null);

  const loadMoreTasks = useCallback(() => {
    if (currentTasks.length >= tasks.length) {
      // Если все задачи загружены
      //   console.log('All tasks loaded');
      return;
    }

    const nextPage = page + 1;
    const newTasks = tasks.slice(0, nextPage * ITEMS_PER_PAGE);
    setCurrentTasks(newTasks);
    setPage(nextPage);
  }, [page, tasks, currentTasks]);

  useEffect(() => {
    const refElement = lastTaskRef.current;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreTasks();
      }
    });

    if (refElement) {
      observer.current.observe(refElement);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loadMoreTasks, currentTasks]);

  useEffect(() => loadMoreTasks(), []); // Only load initially

  return (
    <ul className={styles.tasksList}>
      {currentTasks.map((task, index) => (
        <li
          className={styles.taskItem}
          key={task.id}
          ref={index === currentTasks.length - 1 ? lastTaskRef : null}>
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
