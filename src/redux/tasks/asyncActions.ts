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
  updateTodoEventId,
} from './slice';
import { addEventGoogleCalendar } from '../../utils/googleCalendar';

const getUserTodosCollection = (userId: string) => collection(db, `users/${userId}/todos`);

const getDocId = async (userId: string, todoId: string) => {
  const querySnapshot = await getDocs(query(getUserTodosCollection(userId)));
  return querySnapshot.docs.find((doc) => doc.data().todo.id === todoId)?.id;
};

export const fetchTodo = createAsyncThunk<Todo[], void>('todo/fetchTaskStatus', async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const querySnapshot = await getDocs(
      query(getUserTodosCollection(user.uid), orderBy('myTimestamp', 'desc')),
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
    let todoTask: Todo = {
      id: uuidv4(),
      title,
      completed: false,
      important,
      myDay: false,
      deadline,
      reminder,
      dateСreated: String(new Date()),
      eventId: '',
    };
    thunkAPI.dispatch(addTodo(todoTask));

    if (reminder !== '') {
      try {
        const eventId = await addEventGoogleCalendar(todoTask);
        todoTask = { ...todoTask, eventId };
        thunkAPI.dispatch(updateTodoEventId({ id: todoTask.id, eventId }));
      } catch (error) {
        console.error('Failed to add event to Google Calendar:', error);
      }
    }

    const user = auth.currentUser;
    if (user) {
      await addDoc(getUserTodosCollection(user.uid), {
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

const updateTodoField = async (userId: string, todoId: string, field: string, value: any) => {
  const docId = await getDocId(userId, todoId);
  if (docId) {
    const docRef = doc(db, `users/${userId}/todos/${docId}`);
    await updateDoc(docRef, { [`todo.${field}`]: value });
  }
};

export const toggleCompletedTask = createAsyncThunk(
  'todos/completedTask',
  async (todo: Todo, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTodoStatus(todo));
      const user = auth.currentUser;

      if (user) {
        await updateTodoField(user.uid, todo.id, 'completed', !todo.completed);
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
      await updateTodoField(user.uid, todo.id, 'myDay', !todo.myDay);
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
        await updateTodoField(user.uid, todo.id, 'deadline', todo.deadline);
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
        await updateTodoField(user.uid, todo.id, 'reminder', todo.reminder);
        await updateTodoField(user.uid, todo.id, 'eventId', todo.eventId);
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
      await updateTodoField(user.uid, todo.id, 'title', todo.title.trim());
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
      const docId = await getDocId(user.uid, todo.id);
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
        await updateTodoField(user.uid, todo.id, 'important', !todo.important);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('какая то ошибка');
    }
  },
);
