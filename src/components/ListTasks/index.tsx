import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import styles from './ListTasks.module.scss';
import { PropsListTasks, Todo } from '../../redux/tasks/types';
import { TaskCompletionButton } from '../TaskCompletionButton';
import { TaskDeadlineCountdown } from './TaskDeadlineCountdown';
import { TaskReminderInfo } from './TaskReminderInfo';
import React, { Suspense, useState } from 'react';
import ImportanceButton from './ImportanceButton';

const LazyCompletedTasks = React.lazy(
  () => import(/* webpackChunkName: "CompletedTasks" */ './CompletedTasks'),
);

export const ListTasks: React.FC<PropsListTasks> = ({
  tasks,
  callbackChangeToCompletedTask,
  callbackChangeToActiveTask,
  callbackAddImportant,
  callbackRemoveImportant,
  openTaskDetails,
  completedTasks,
}) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const filteredAndSortedTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return dateA - dateB;
    });

  const handleToggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className={styles.tasks}>
      <div>
        <ul className={styles.tasksList}>
          {filteredAndSortedTasks.map((task) => (
            <li className={styles.taskItem} key={task.id}>
              <div className={styles.titleWrapper}>
                <TaskCompletionButton
                  callbackChangeToCompletedTask={callbackChangeToCompletedTask}
                  task={task}
                />
                <button className={styles.taskTitleButton} onClick={() => openTaskDetails(task)}>
                  <span className={styles.taskTitle}>{task.title}</span>
                  <br />
                  <div className={styles.taskMetaDataInfo}>
                    {task.deadline && (
                      <span>
                        <svg
                          className={styles.detailsIcon}
                          width="14px"
                          height="14px"
                          version="1.1"
                          viewBox="0 0 100.353 100.353"
                          xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path d="M32.286,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5v-9.762C33.786,43.113,33.115,42.441,32.286,42.441z M30.786,52.203h-6.762v-6.762h6.762V52.203z" />
                            <path d="M55.054,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762C56.554,43.113,55.882,42.441,55.054,42.441z M53.554,52.203h-6.762v-6.762h6.762V52.203z" />
                            <path d="M77.12,42.441h-9.762c-0.828,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762C78.62,43.113,77.948,42.441,77.12,42.441z M75.62,52.203h-6.762v-6.762h6.762V52.203z" />
                            <path d="M32.286,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5v-9.762C33.786,65.349,33.115,64.677,32.286,64.677z M30.786,74.439h-6.762v-6.762h6.762V74.439z" />
                            <path d="M55.054,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762C56.554,65.349,55.882,64.677,55.054,64.677z M53.554,74.439h-6.762v-6.762h6.762V74.439z" />
                            <path d="M77.12,64.677h-9.762c-0.828,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762C78.62,65.349,77.948,64.677,77.12,64.677z M75.62,74.439h-6.762v-6.762h6.762V74.439z" />
                            <path d="M89,13.394h-9.907c-0.013,0-0.024,0.003-0.037,0.004V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994H56.041V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994H33.025V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.995c-0.005,0-0.01-0.001-0.015-0.001h-9.905c-0.829,0-1.5,0.671-1.5,1.5V92.64c0,0.828,0.671,1.5,1.5,1.5H89c0.828,0,1.5-0.672,1.5-1.5V14.894C90.5,14.065,89.828,13.394,89,13.394z M70.204,11.4c0-1.614,1.312-2.926,2.926-2.926s2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926s-2.926-1.312-2.926-2.926V11.4z M50.115,8.474c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926c-1.614,0-2.926-1.312-2.926-2.926v-4.643c0.004-0.047,0.014-0.092,0.014-0.141s-0.01-0.094-0.014-0.141V11.4C47.189,9.786,48.501,8.474,50.115,8.474z M24.173,11.4c0-1.614,1.312-2.926,2.926-2.926c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926c-1.614,0-2.926-1.312-2.926-2.926V11.4z M87.5,91.14H12.753V16.394h8.405c0.005,0,0.01-0.001,0.015-0.001v3.285c0,3.268,2.659,5.926,5.926,5.926s5.926-2.658,5.926-5.926v-3.283h11.164v3.283c0,3.268,2.659,5.926,5.926,5.926s5.926-2.658,5.926-5.926v-3.283h11.163v3.283c0,3.268,2.658,5.926,5.926,5.926s5.926-2.658,5.926-5.926V16.39c0.013,0,0.024,0.004,0.037,0.004H87.5V91.14z" />
                          </g>
                        </svg>
                        <TaskDeadlineCountdown task={task} styles={styles.detailsIcon} />
                      </span>
                    )}
                    <TaskReminderInfo task={task} />
                  </div>
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
      </div>
      <Accordion
        allowZeroExpanded
        onChange={handleToggleAccordion}
        className={styles.accordionMain}>
        <AccordionItem className={styles.accordionItem}>
          <AccordionItemHeading>
            <AccordionItemButton className={styles.accordionButton}>
              Завершенные <span>{completedTasks}</span>
            </AccordionItemButton>
          </AccordionItemHeading>
          {isAccordionOpen && (
            <AccordionItemPanel className={styles.accordionPanel}>
              <Suspense fallback={<div>Loading…</div>}>
                <LazyCompletedTasks
                  tasks={tasks.filter((task) => task.completed)}
                  callbackChangeToActiveTask={callbackChangeToActiveTask}
                  openTaskDetails={openTaskDetails}
                  callbackAddImportant={callbackAddImportant}
                  callbackRemoveImportant={callbackRemoveImportant}
                />
              </Suspense>
            </AccordionItemPanel>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
