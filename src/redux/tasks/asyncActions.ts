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
  QuerySnapshot,
  Firestore,
  DocumentData,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, setTodoStatus, setImportStatus } from './slice';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBthLDkbwkqXMUHVGr_ONl-MpOo8CEboQQ',
  authDomain: 'todotimekeeper.firebaseapp.com',
  projectId: 'todotimekeeper',
  storageBucket: 'todotimekeeper.appspot.com',
  messagingSenderId: '1076102409898',
  appId: '1:1076102409898:web:142757f96e24e9311faad3',
  measurementId: 'G-M99G9VDTKJ',
});
const db: Firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export const fetchTodo = createAsyncThunk<Todo[], void>('todo/fetchTaskStatus', async () => {
  const querySnapshot = await getDocs(
    query(collection(db, `users/${auth.currentUser?.uid}/todos`), orderBy('myTimestamp', 'desc')),
  );

  const data = querySnapshot.docs.map((doc) => doc.data());

  const tasks: Todo[] = data.map((item) => item.todo);

  tasks.forEach((task) => {
    if (task.deadline != undefined) {
      let todo = task.deadline.toDate().toString();

      task.deadline = todo;

      return task;
    }
  });

  return tasks;
});

export const addTask = createAsyncThunk<Todo, { title: string; deadline: string }>(
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
  'todos/completedTask',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));

      const user = getAuth().currentUser;

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

      const user = getAuth().currentUser;

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
      const user = getAuth().currentUser;

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

      const user = getAuth().currentUser;

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
