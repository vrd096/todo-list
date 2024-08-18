import { Tasks } from '../components/Tasks';
import { ImportantHeader } from '../components/ImportantHeader';
import { Todo } from '../redux/tasks/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Important = () => {
  const tasks: Todo[] = useSelector((state: RootState) => state.todos);

  const importantTask = tasks.filter((task) => {
    return task.important == true;
  });

  return (
    <div>
      <ImportantHeader />
      <Tasks tasks={importantTask} />
    </div>
  );
};
export default Important;
