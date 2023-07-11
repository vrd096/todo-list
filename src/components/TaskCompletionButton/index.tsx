import styles from './TaskCompletionButton.module.scss';
export const TaskCompletionButton = ({ callbackChangeToCompletedTask, task }: any) => {
  return (
    <button
      className={styles.circle}
      onClick={() => {
        callbackChangeToCompletedTask(task);
      }}></button>
  );
};
