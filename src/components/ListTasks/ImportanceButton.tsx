import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { Todo } from '../../redux/tasks/types';
import styles from './ListTasks.module.scss';

interface ImportanceButtonProps {
  task: Todo;
  callbackAddImportant: (task: Todo) => void;
  callbackRemoveImportant: (task: Todo) => void;
}

const ImportanceButton: React.FC<ImportanceButtonProps> = ({
  task,
  callbackAddImportant,
  callbackRemoveImportant,
}) => (
  <button
    className={styles.importantButton}
    onClick={() => (task.important ? callbackRemoveImportant(task) : callbackAddImportant(task))}>
    <Tooltip
      hasArrow
      fontSize="12"
      bg="#fff"
      color="#000"
      padding="5"
      transitionDuration="0.1s"
      placement="top"
      label={task.important ? 'Отменить важность задачи' : 'Пометить как важную'}
      aria-label="A tooltip">
      <svg
        className={styles.star}
        width="16px"
        height="16px"
        fill={task.important ? '#78bafd' : '#252423'}
        strokeWidth="3px"
        viewBox="0 0 64.00 64.00"
        enableBackground="new 0 0 64 64">
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path>
        </g>
      </svg>
    </Tooltip>
  </button>
);

export default ImportanceButton;
