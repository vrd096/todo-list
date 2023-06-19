import { Todo } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, setTodoStatus, setImportStatus } from './slice';

export const fetchTodo = createAsyncThunk<Todo[], void>('todo/fetchTaskStatus', async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, `users/${auth.currentUser?.uid}/todos`), orderBy('myTimestamp', 'desc')),
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

export const addTask = createAsyncThunk<Todo, { title: string; deadline: string }>(
  'todos/addTask',
  async ({ title, deadline }, thunkAPI) => {
    try {
      const todoTask = {
        id: uuidv4(),
        title,
        completed: false,
        important: false,
        deadline,
      };
      thunkAPI.dispatch(addTodo(todoTask));
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, `users/${user?.uid}/todos`), {
          todo: todoTask,
          myTimestamp: serverTimestamp(),
        });
        return todoTask;
      }
      return todoTask;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const changeToCompletedTask = createAsyncThunk(
  'todos/completedTask',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));

      const user = auth.currentUser;

      if (user) {
        const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

        const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

        if (docId) {
          const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

          await updateDoc(docRef, { 'todo.completed': true });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);

export const changeToActiveTask = createAsyncThunk(
  'todos/activeTask',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));

      const user = auth.currentUser;

      if (user) {
        const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

        const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

        if (docId) {
          const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

          await updateDoc(docRef, { 'todo.completed': false });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);

export const addImportant = createAsyncThunk(
  'todos/addImportantTask',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setImportStatus(todo));
      const user = auth.currentUser;

      if (user) {
        const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

        const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

        if (docId) {
          const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

          await updateDoc(docRef, { 'todo.important': true });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);

export const removeImportant = createAsyncThunk(
  'todos/removeImportantTask',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setImportStatus(todo));

      const user = auth.currentUser;

      if (user) {
        const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

        const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

        if (docId) {
          const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

          await updateDoc(docRef, { 'todo.important': false });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
