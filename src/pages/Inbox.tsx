import { useSelector } from 'react-redux';
import { InboxHeader } from '../components/InboxHeader';
import { Tasks } from '../components/Tasks';
import { Todo } from '../redux/tasks/types';
import { RootState } from '../redux/store';

const Inbox = () => {
  const tasks: Todo[] = useSelector((state: RootState) => state.todos);

  return (
    <div>
      <InboxHeader />
      <Tasks tasks={tasks} />
    </div>
  );
};

export default Inbox;
