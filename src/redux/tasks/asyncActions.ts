import { Todo } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import {
  addTodo,
  setTodoStatus,
  setImportantStatus,
  setTaskTitle,
  removeTodo,
  setTaskReminder,
  toggleMyDaySlice,
  setTaskDeadline,
} from './slice';

// Вспомогательная функция для получения ID документа
const getTodoDocId = async (todoId: string, userId: string): Promise<string | null> => {
  const dbInstance = await db();
  const querySnapshot = await getDocs(query(collection(dbInstance, `users/${userId}/todos`)));
  const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todoId)?.id;
  return docId || null;
};

// Вспомогательная функция для изменения поля задачи
const updateTodoField = async (
  userId: string,
  todoId: string,
  field: string,
  value: any,
): Promise<void> => {
  const dbInstance = await db();
  const docId = await getTodoDocId(todoId, userId);
  if (docId) {
    const docRef = doc(dbInstance, `users/${userId}/todos/${docId}`);
    await updateDoc(docRef, { [`todo.${field}`]: value });
  }
};

export const fetchTodo = createAsyncThunk<Todo[], void>('todo/fetchTaskStatus', async () => {
  try {
    const dbInstance = await db();
    const authInstance = await auth();
    const user = authInstance.currentUser;

    if (!user) throw new Error('User not authenticated');

    const querySnapshot = await getDocs(
      query(collection(dbInstance, `users/${user.uid}/todos`), orderBy('myTimestamp', 'desc')),
    );

    const tasks: Todo[] = querySnapshot.docs.map((doc) => {
      const task = doc.data().todo;
      if (task.deadline !== undefined) {
        task.deadline = task.deadline.toString();
      }
      return task;
    });

    return tasks;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const addTask = createAsyncThunk<
  Todo,
  { title: string; deadline: string; reminder: string; important: boolean }
>('todos/addTask', async ({ title, deadline, reminder, important }, thunkAPI) => {
  try {
    const todoTask = {
      id: uuidv4(),
      title,
      completed: false,
      important,
      myDay: false,
      deadline,
      reminder,
      dateCreated: String(new Date()),
    };
    thunkAPI.dispatch(addTodo(todoTask));

    const dbInstance = await db();
    const authInstance = await auth();
    const user = authInstance.currentUser;

    if (!user) throw new Error('User not authenticated');

    await addDoc(collection(dbInstance, `users/${user.uid}/todos`), {
      todo: todoTask,
      myTimestamp: serverTimestamp(),
    });

    return todoTask;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Общая функция для изменения статуса задачи
const createTodoFieldUpdateThunk = (actionType: string, field: string, actionCreator: Function) =>
  createAsyncThunk(actionType, async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(actionCreator(todo));
      const dbInstance = await db();
      const authInstance = await auth();
      const user = authInstance.currentUser;

      if (!user) throw new Error('User not authenticated');

      await updateTodoField(user.uid, todo.id, field, !todo[field]);
    } catch (error) {
      return thunkAPI.rejectWithValue('Some error occurred');
    }
  });

export const toggleCompletedTask = createTodoFieldUpdateThunk(
  'todos/completedTask',
  'completed',
  setTodoStatus,
);

export const changeMyDay = createTodoFieldUpdateThunk(
  'todos/changeMyDay',
  'myDay',
  toggleMyDaySlice,
);

export const toggleImportant = createTodoFieldUpdateThunk(
  'todos/toggleImportantTask',
  'important',
  setImportantStatus,
);

// Функция для обновления задач
const createTaskUpdateThunk = (actionType: string, field: string, actionCreator: Function) =>
  createAsyncThunk(actionType, async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(actionCreator(todo));
      const dbInstance = await db();
      const authInstance = await auth();
      const user = authInstance.currentUser;

      if (!user) throw new Error('User not authenticated');

      await updateTodoField(user.uid, todo.id, field, todo[field]);
    } catch (error) {
      return thunkAPI.rejectWithValue('Some error occurred');
    }
  });

export const updateTaskDeadline = createTaskUpdateThunk(
  'todos/taskDeadline',
  'deadline',
  setTaskDeadline,
);

export const updateTaskReminder = createTaskUpdateThunk(
  'todos/taskReminder',
  'reminder',
  setTaskReminder,
);

export const updateTaskTitle = createTaskUpdateThunk('todos/taskTitle', 'title', setTaskTitle);

export const deleteTask = createAsyncThunk('todos/deleteTask', async (todo: Todo, thunkAPI) => {
  try {
    thunkAPI.dispatch(removeTodo(todo));
    const dbInstance = await db();
    const authInstance = await auth();
    const user = authInstance.currentUser;

    if (!user) throw new Error('User not authenticated');

    const docId = await getTodoDocId(todo.id, user.uid);
    if (docId) {
      const docRef = doc(dbInstance, `users/${user.uid}/todos/${docId}`);
      await deleteDoc(docRef);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('Some error occurred');
  }
});
