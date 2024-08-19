export interface Todo {
  id: string;
  title: string;
  deadline: string | Date | undefined;
  reminder: string | Date;
  completed: boolean;
  myDay: boolean;
  important: boolean;
  eventId: string;
  dateСreated: string;
}
export interface PropsListTasks {
  tasks: Todo[];
  callbackChangeToCompletedTask: (task: Todo) => void;
  callbackChangeToActiveTask: (task: Todo) => void;
  callbackAddImportant: (task: Todo) => void;
  callbackRemoveImportant: (task: Todo) => void;
  openTaskDetails: (task: Todo) => void;
  completedTasks: number;
}

export interface PropsTasks {
  tasks: Todo[];
}
