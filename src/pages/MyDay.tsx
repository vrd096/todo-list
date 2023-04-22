import { useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { TaskType, Tasks } from '../components/Tasks/Tasks';
import { TodoHeader } from '../components/TodoHeader';
import { Todolist } from '../components/Todolist/Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active';

export const MyDay = () => {
  let initTasks: TaskType[] = [
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 4, title: 'React', isDone: false },
    { id: 5, title: 'React', isDone: false },
    { id: 6, title: 'React', isDone: false },
  ];
  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(id: number) {
    let filterTasks = tasks.filter((t) => t.id !== id);
    setTasks(filterTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let taskForTodolist = tasks;
  if (filter === 'completed') {
    taskForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    taskForTodolist = tasks.filter((t) => t.isDone === false);
  }
  return (
    <div className="wrapper">
      <TodoHeader />
      <Tasks
        title="What to learn"
        tasks={taskForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
};
