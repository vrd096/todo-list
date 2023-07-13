import styles from './TaskActiveButton.module.scss';
export const TaskActiveButton = ({ callbackChangeToActiveTask, task }: any) => {
  return (
    <button
      className={styles.circleCompleted}
      onClick={() => {
        callbackChangeToActiveTask(task);
      }}></button>
  );
};
