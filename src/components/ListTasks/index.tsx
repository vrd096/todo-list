import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import styles from './ListTasks.module.scss';
import { PropsListTasks } from '../../redux/tasks/types';
import { TaskCompletionButton } from '../TaskCompletionButton';
import { TaskActiveButton } from '../TaskActiveButton';
import { Tooltip } from '@chakra-ui/react';
import { TaskDeadlineCountdown } from './TaskDeadlineCountdown';
import { TaskReminderInfo } from './TaskReminderInfo';

export const ListTasks = ({
  tasks,
  callbackChangeToCompletedTask,
  callbackChangeToActiveTask,
  callbackAddImportant,
  callbackRemoveImportant,
  openTaskDetails,
  completedTasks,
}: PropsListTasks) => {
  return (
    <div className={styles.tasks}>
      <div>
        <ul className={styles.tasksList}>
          {tasks
            .filter((task) => task.completed == false)
            .map((task) => {
              return (
                <li className={styles.taskItem} key={task.id}>
                  <div className={styles.titleWrapper}>
                    <TaskCompletionButton
                      callbackChangeToCompletedTask={callbackChangeToCompletedTask}
                      task={task}
                    />
                    <button
                      className={styles.taskTitleButton}
                      onClick={() => {
                        openTaskDetails(task);
                      }}>
                      <span className={styles.taskTitle}>{task.title}</span>
                      <br />
                      <div className={styles.taskMetaDataInfo}>
                        {task.deadline != '' && (
                          <span>
                            <svg
                              className={styles.detailsIcon}
                              width="14px"
                              height="14px"
                              version="1.1"
                              viewBox="0 0 100.353 100.353"
                              xmlns="http://www.w3.org/2000/svg">
                              <g>
                                <path d="M32.286,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,43.113,33.115,42.441,32.286,42.441z M30.786,52.203h-6.762v-6.762h6.762V52.203z" />
                                <path d="M55.054,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,43.113,55.882,42.441,55.054,42.441z M53.554,52.203h-6.762v-6.762h6.762V52.203z" />
                                <path d="M77.12,42.441h-9.762c-0.828,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,43.113,77.948,42.441,77.12,42.441z M75.62,52.203h-6.762v-6.762h6.762V52.203z" />
                                <path d="M32.286,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,65.349,33.115,64.677,32.286,64.677z M30.786,74.439h-6.762v-6.762h6.762V74.439z" />
                                <path d="M55.054,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,65.349,55.882,64.677,55.054,64.677z M53.554,74.439h-6.762v-6.762h6.762V74.439z" />
                                <path d="M77.12,64.677h-9.762c-0.828,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,65.349,77.948,64.677,77.12,64.677z M75.62,74.439h-6.762v-6.762h6.762V74.439z" />
                                <path d="M89,13.394h-9.907c-0.013,0-0.024,0.003-0.037,0.004V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994   H56.041V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994H33.025V11.4c0-3.268-2.658-5.926-5.926-5.926   s-5.926,2.659-5.926,5.926v1.995c-0.005,0-0.01-0.001-0.015-0.001h-9.905c-0.829,0-1.5,0.671-1.5,1.5V92.64   c0,0.828,0.671,1.5,1.5,1.5H89c0.828,0,1.5-0.672,1.5-1.5V14.894C90.5,14.065,89.828,13.394,89,13.394z M70.204,11.4   c0-1.614,1.312-2.926,2.926-2.926s2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926s-2.926-1.312-2.926-2.926V11.4z    M50.115,8.474c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926c-1.614,0-2.926-1.312-2.926-2.926v-4.643   c0.004-0.047,0.014-0.092,0.014-0.141s-0.01-0.094-0.014-0.141V11.4C47.189,9.786,48.501,8.474,50.115,8.474z M24.173,11.4   c0-1.614,1.312-2.926,2.926-2.926c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926   c-1.614,0-2.926-1.312-2.926-2.926V11.4z M87.5,91.14H12.753V16.394h8.405c0.005,0,0.01-0.001,0.015-0.001v3.285   c0,3.268,2.659,5.926,5.926,5.926s5.926-2.658,5.926-5.926v-3.283h11.164v3.283c0,3.268,2.659,5.926,5.926,5.926   s5.926-2.658,5.926-5.926v-3.283h11.163v3.283c0,3.268,2.658,5.926,5.926,5.926s5.926-2.658,5.926-5.926V16.39   c0.013,0,0.024,0.004,0.037,0.004H87.5V91.14z" />
                              </g>
                            </svg>
                            <TaskDeadlineCountdown task={task} styles={styles.detailsIcon} />
                          </span>
                        )}
                        <TaskReminderInfo task={task} />
                      </div>
                    </button>
                  </div>
                  {!task.important ? (
                    <button
                      className={styles.importantButton}
                      onClick={() => {
                        callbackAddImportant(task);
                      }}>
                      <Tooltip
                        hasArrow
                        fontSize="12"
                        bg="#fff"
                        color="#000"
                        padding="5"
                        transitionDuration="0.1s"
                        placement="top"
                        label="Пометить как важную"
                        aria-label="A tooltip">
                        <svg
                          className={styles.star}
                          width="16px"
                          height="16px"
                          fill="#252423"
                          strokeWidth="3px"
                          viewBox="0 0 64.00 64.00"
                          enableBackground="new 0 0 64 64">
                          <g id="SVGRepo_bgCarrier"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            {' '}
                            <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path>{' '}
                          </g>
                        </svg>
                      </Tooltip>
                    </button>
                  ) : (
                    <button
                      className={styles.importantButton}
                      onClick={() => {
                        callbackRemoveImportant(task);
                      }}>
                      <Tooltip
                        hasArrow
                        fontSize="12"
                        bg="#fff"
                        color="#000"
                        padding="5"
                        transitionDuration="0.1s"
                        placement="top"
                        label="Отменить важность задачи"
                        aria-label="A tooltip">
                        <svg
                          className={styles.star}
                          width="16px"
                          height="16px"
                          fill="#78bafd"
                          strokeWidth="3px"
                          viewBox="0 0 64.00 64.00"
                          enableBackground="new 0 0 64 64">
                          <g id="SVGRepo_bgCarrier"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            {' '}
                            <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path>{' '}
                          </g>
                        </svg>
                      </Tooltip>
                    </button>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      <Accordion allowZeroExpanded className={styles.accordionMain}>
        <AccordionItem className={styles.accordionItem}>
          <AccordionItemHeading>
            <AccordionItemButton className={styles.accordionButton}>
              Завершенные <span>{completedTasks}</span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={styles.accordionPanel}>
            <ul className={styles.tasksList}>
              {tasks
                .filter((task) => task.completed == true)
                .map((task) => {
                  return (
                    <li className={styles.taskItem} key={task.id}>
                      <div className={styles.titleWrapper}>
                        <TaskActiveButton
                          callbackChangeToActiveTask={callbackChangeToActiveTask}
                          task={task}
                        />
                        <button
                          className={styles.taskTitleButton}
                          onClick={() => {
                            openTaskDetails(task);
                          }}>
                          <span className={styles.accordionTitle}>{task.title}</span>
                        </button>
                      </div>
                      {!task.important ? (
                        <button
                          className={styles.importantButton}
                          onClick={() => {
                            callbackAddImportant(task);
                          }}>
                          <Tooltip
                            hasArrow
                            fontSize="12"
                            bg="#fff"
                            color="#000"
                            padding="5"
                            transitionDuration="0.1s"
                            placement="top"
                            label="Пометить как важную"
                            aria-label="A tooltip">
                            <svg
                              className={styles.star}
                              width="16px"
                              height="16px"
                              fill="#252423"
                              strokeWidth="3px"
                              viewBox="0 0 64.00 64.00"
                              enableBackground="new 0 0 64 64">
                              <g id="SVGRepo_bgCarrier"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                {' '}
                                <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path>{' '}
                              </g>
                            </svg>
                          </Tooltip>
                        </button>
                      ) : (
                        <button
                          className={styles.importantButton}
                          onClick={() => {
                            callbackRemoveImportant(task);
                          }}>
                          <Tooltip
                            hasArrow
                            fontSize="12"
                            bg="#fff"
                            color="#000"
                            padding="5"
                            transitionDuration="0.1s"
                            placement="top"
                            label="Отменить важность задачи"
                            aria-label="A tooltip">
                            <svg
                              className={styles.star}
                              width="16px"
                              height="16px"
                              fill="#78bafd"
                              strokeWidth="3px"
                              viewBox="0 0 64.00 64.00"
                              enableBackground="new 0 0 64 64">
                              <g id="SVGRepo_bgCarrier"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                {' '}
                                <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path>{' '}
                              </g>
                            </svg>
                          </Tooltip>
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
