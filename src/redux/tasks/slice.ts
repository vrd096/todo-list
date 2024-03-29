import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';
import { fetchTodo } from './asyncActions';
import { addEventGoogleCalendar } from '../../utils/googleCalendar';

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.unshift(action.payload);
      if (action.payload.reminder != '') {
        addEventGoogleCalendar(action.payload);
      }
    },
    removeTodo(state, action: PayloadAction<Todo>) {
      const filteredState = state.filter((todo: Todo) => todo.id !== action.payload.id);
      return filteredState;
    },
    setTaskTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      state
        .filter((todo) => todo.id === action.payload.id)
        .forEach((todo) => {
          todo.title = action.payload.title;
        });
    },
    setTaskReminder(state, action: PayloadAction<Todo>) {
      state
        .filter((todo) => todo.id === action.payload.id)
        .forEach((todo) => {
          todo.reminder = action.payload.reminder;
        });
    },
    setTaskDeadline(state, action: PayloadAction<Todo>) {
      state
        .filter((todo) => todo.id === action.payload.id)
        .forEach((todo) => {
          todo.deadline = action.payload.deadline;
        });
    },
    toggleMyDaySlice(state, action: PayloadAction<{ id: string; myDay: boolean }>) {
      state
        .filter((todo) => todo.id === action.payload.id)
        .forEach((todo) => {
          todo.myDay = !todo.myDay;
        });
    },
    setTodoStatus(state, action: PayloadAction<{ id: string; completed: boolean }>) {
      state
        .filter((todo) => todo.id === action.payload.id)
        .forEach((todo) => {
          todo.completed = !action.payload.completed;
        });
    },
    setImportantStatus(state, action: PayloadAction<{ id: string; important: boolean }>) {
      state
        .filter((todo) => todo.id === action.payload.id)
        .forEach((todo) => {
          todo.important = !action.payload.important;
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {});
    builder.addCase(fetchTodo.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      return action.payload.map((item) => item);
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {});
  },
});

export const {
  addTodo,
  removeTodo,
  setTodoStatus,
  setImportantStatus,
  setTaskReminder,
  setTaskTitle,
  toggleMyDaySlice,
  setTaskDeadline,
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
