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
  deleteDoc,
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
      dateСreated: String(new Date()),
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
});

export const toggleCompletedTask = createAsyncThunk(
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

          await updateDoc(docRef, { 'todo.completed': !todo.completed });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);

export const changeMyDay = createAsyncThunk('todos/taskReminder', async (todo: Todo, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleMyDaySlice(todo));

    const user = auth.currentUser;

    if (user) {
      const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

      const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

      if (docId) {
        const docRef = doc(db, `users/${user.uid}/todos/${docId}`);
        await updateDoc(docRef, { 'todo.myDay': !todo.myDay });
      }
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('какая то ошибка');
  }
});
export const updateTaskDeadline = createAsyncThunk(
  'todos/taskDeadline',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTaskDeadline(todo));
      const user = auth.currentUser;

      if (user) {
        const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

        const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

        if (docId) {
          const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

          await updateDoc(docRef, { 'todo.deadline': todo.deadline });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
export const updateTaskReminder = createAsyncThunk(
  'todos/taskReminder',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTaskReminder(todo));
      const user = auth.currentUser;

      if (user) {
        const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

        const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

        if (docId) {
          const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

          await updateDoc(docRef, { 'todo.reminder': todo.reminder });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
export const updateTaskTitle = createAsyncThunk('todos/taskTitle', async (todo: Todo, thunkAPI) => {
  try {
    thunkAPI.dispatch(setTaskTitle(todo));

    const user = auth.currentUser;

    if (user) {
      const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

      const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

      if (docId) {
        const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

        await updateDoc(docRef, { 'todo.title': todo.title.trim() });
      }
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('какая то ошибка');
  }
});
export const deleteTask = createAsyncThunk('todos/deleteTask', async (todo: Todo, thunkAPI) => {
  try {
    thunkAPI.dispatch(removeTodo(todo));

    const user = auth.currentUser;

    if (user) {
      const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

      const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

      if (docId) {
        const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

        await deleteDoc(docRef);
      }
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('какая то ошибка');
  }
});

export const toggleImportant = createAsyncThunk(
  'todos/toggleImportantTask',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setImportantStatus(todo));
      const user = auth.currentUser;

      if (user) {
        const querySnapshot = await getDocs(query(collection(db, `users/${user.uid}/todos`)));

        const docId = querySnapshot.docs.find((doc) => doc.data().todo.id === todo.id)?.id;

        if (docId) {
          const docRef = doc(db, `users/${user.uid}/todos/${docId}`);

          await updateDoc(docRef, { 'todo.important': !todo.important });
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
