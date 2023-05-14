import { Todo } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, setTodoStatus } from './slice';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBthLDkbwkqXMUHVGr_ONl-MpOo8CEboQQ',
  authDomain: 'todotimekeeper.firebaseapp.com',
  projectId: 'todotimekeeper',
  storageBucket: 'todotimekeeper.appspot.com',
  messagingSenderId: '1076102409898',
  appId: '1:1076102409898:web:142757f96e24e9311faad3',
  measurementId: 'G-M99G9VDTKJ',
});
const db = getFirestore(firebaseApp);

export const fetchTodo = createAsyncThunk<Todo[]>('todo/fetchTodoStatus', async () => {
  const querySnapshot = await getDocs(
    query(collection(db, 'todos'), orderBy('myTimestamp', 'desc')),
  );

  const data = querySnapshot.docs.map((doc) => doc.data());

  const task = data.map((item) => item.todo);

  return task;
});

export const addTask = createAsyncThunk<Todo, string>(
  'todos/addTask',
  async (title: string, thunkAPI) => {
    const todoTask = {
      id: uuidv4(),
      title,
      completed: false,
    };
    try {
      thunkAPI.dispatch(addTodo(todoTask));
      await addDoc(collection(db, 'todos'), {
        todo: todoTask,
        myTimestamp: serverTimestamp(),
      });
      return todoTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const changeToCompletedTask = createAsyncThunk(
  'todos/deleteTodo',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));

      const querySnapshot = await getDocs(
        query(collection(db, 'todos'), where('todo', '==', todo)),
      );

      const docRef = doc(db, 'todos', querySnapshot.docs[0].id);

      await updateDoc(docRef, { 'todo.completed': true });
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
export const changeToActiveTask = createAsyncThunk(
  'todos/deleteTodo',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));

      const querySnapshot = await getDocs(
        query(collection(db, 'todos'), where('todo', '==', todo)),
      );

      const docRef = doc(db, 'todos', querySnapshot.docs[0].id);

      await updateDoc(docRef, { 'todo.completed': false });
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
