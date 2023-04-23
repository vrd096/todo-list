import { Tasks } from '../components/Tasks/Tasks';
import { MyDayHeader } from '../components/MyDayHeader/MyDayHeader';

export const MyDay = () => {
  return (
    <div>
      <MyDayHeader />
      <Tasks />
    </div>
  );
};
