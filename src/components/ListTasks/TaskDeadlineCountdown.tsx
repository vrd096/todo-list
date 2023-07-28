import { useEffect, useState } from 'react';
import { formatDistanceStrict } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

export const TaskDeadlineCountdown = ({ task }: any) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function distanceStrict() {
      const deadline = new Date(task.deadline);

      const timeLeft = formatDistanceStrict(deadline, new Date(), {
        addSuffix: true,
        locale: ruLocale,
      });
      setTimeLeft(timeLeft);
    }
    distanceStrict();
    const timeoutId = setTimeout(() => {
      distanceStrict();
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, [task.deadline]);

  return (
    <span>
      {timeLeft.endsWith('назад') ? (
        <span style={{ color: '#f1707b' }}> Просрочено {timeLeft} </span>
      ) : (
        <span> Истекает {timeLeft}</span>
      )}
    </span>
  );
};
