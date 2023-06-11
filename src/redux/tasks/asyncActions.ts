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
import { addTodo, setTodoStatus, setImportStatus } from './slice';
import { getAuth } from 'firebase/auth';
import { isUndefined } from 'util';

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
const auth = getAuth(firebaseApp);

export const fetchTodo = createAsyncThunk<Todo[], void>('todo/fetchTodoStatus', async () => {
  const querySnapshot = await getDocs(
    query(collection(db, `users/${auth.currentUser?.uid}/todos`), orderBy('myTimestamp', 'desc')),
  );

  const data = querySnapshot.docs.map((doc) => doc.data());

  const tasks: Todo[] = data.map((item) => item.todo);

  tasks.forEach((task) => {
    if (task.deadline != undefined) {
      let todo = task.deadline.toDate();
      task.deadline = String(todo);

      return task;
    }
  });

  return tasks;
});

export const addTask = createAsyncThunk<Todo, { title: string; deadline: Date }>(
  'todos/addTask',
  async ({ title, deadline }, thunkAPI) => {
    const todoTask = {
      id: uuidv4(),
      title,
      completed: false,
      important: false,
      deadline,
    };
    try {
      thunkAPI.dispatch(addTodo(todoTask));
      const user = getAuth().currentUser;
      if (user) {
        await addDoc(collection(db, `users/${user.uid}/todos`), {
          todo: todoTask,
          myTimestamp: serverTimestamp(),
        });
        return todoTask;
      }
      return todoTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const changeToCompletedTask = createAsyncThunk(
  'todos/completedTodo',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));

      const querySnapshot = await getDocs(
        query(collection(db, `users/${auth.currentUser?.uid}/todos`), where('todo', '==', todo)),
      );

      const docRef = doc(db, `users/${auth.currentUser?.uid}/todos`, querySnapshot.docs[0].id);

      await updateDoc(docRef, { 'todo.completed': true });
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
export const changeToActiveTask = createAsyncThunk(
  'todos/activeTodo',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));

      const querySnapshot = await getDocs(
        query(collection(db, `users/${auth.currentUser?.uid}/todos`), where('todo', '==', todo)),
      );

      const docRef = doc(db, `users/${auth.currentUser?.uid}/todos`, querySnapshot.docs[0].id);

      await updateDoc(docRef, { 'todo.completed': false });
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);

export const addImportant = createAsyncThunk(
  'todos/addImportantTodo',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setImportStatus(todo));

      const querySnapshot = await getDocs(
        query(collection(db, `users/${auth.currentUser?.uid}/todos`), where('todo', '==', todo)),
      );

      const docRef = doc(db, `users/${auth.currentUser?.uid}/todos`, querySnapshot.docs[0].id);

      await updateDoc(docRef, { 'todo.important': true });
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);

export const removeImportant = createAsyncThunk(
  'todos/removeImportantTodo',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setImportStatus(todo));

      const querySnapshot = await getDocs(
        query(collection(db, `users/${auth.currentUser?.uid}/todos`), where('todo', '==', todo)),
      );

      const docRef = doc(db, `users/${auth.currentUser?.uid}/todos`, querySnapshot.docs[0].id);

      await updateDoc(docRef, { 'todo.important': false });
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
