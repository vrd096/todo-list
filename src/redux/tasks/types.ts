export interface Todo {
  id: string;
  title: string;
  deadline: string | Date;
  completed: boolean;
  important: boolean;
}
export interface PropsListTasks {
  tasks: Todo[];
  callbackChangeToCompletedTask: (task: Todo) => void;
  callbackChangeToActiveTask: (task: Todo) => void;
  callbackAddImportant: (task: Todo) => void;
  callbackRemoveImportant: (task: Todo) => void;
  completedTasks: number;
}

export interface PropsTasks {
  tasks: Todo[];
}
export interface PropsSidebar {
  maDayTasks: number;
  importantTasks: number;
  allTasks: number;
  isSidebarOpen: boolean;
}
