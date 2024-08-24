import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';
import { fetchTodo } from './asyncActions';

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.unshift(action.payload);
    },
    updateTodoEventId: (state, action: PayloadAction<{ id: string; eventId: string }>) => {
      const { id, eventId } = action.payload;
      const todo = state.find((task) => task.id === id);
      if (todo) {
        todo.eventId = eventId; // Обновляем eventId
      }
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    setTaskTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.find((task) => task.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    setTaskReminder: (state, action: PayloadAction<Todo>) => {
      const todo = state.find((task) => task.id === action.payload.id);
      if (todo) {
        todo.reminder = action.payload.reminder;
      }
    },
    setTaskDeadline: (state, action: PayloadAction<Todo>) => {
      const todo = state.find((task) => task.id === action.payload.id);
      if (todo) {
        todo.deadline = action.payload.deadline;
      }
    },
    toggleMyDaySlice: (state, action: PayloadAction<{ id: string; myDay: boolean }>) => {
      const todo = state.find((task) => task.id === action.payload.id);
      if (todo) {
        todo.myDay = !todo.myDay;
      }
    },
    setTodoStatus: (state, action: PayloadAction<{ id: string; completed: boolean }>) => {
      const todo = state.find((task) => task.id === action.payload.id);
      if (todo) {
        todo.completed = !action.payload.completed;
      }
    },
    setImportantStatus: (state, action: PayloadAction<{ id: string; important: boolean }>) => {
      const todo = state.find((task) => task.id === action.payload.id);
      if (todo) {
        todo.important = !action.payload.important;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {});
    builder.addCase(fetchTodo.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      console.error('Error fetching todos:', action.error);
    });
  },
});

export const {
  addTodo,
  updateTodoEventId,
  removeTodo,
  setTodoStatus,
  setImportantStatus,
  setTaskReminder,
  setTaskTitle,
  toggleMyDaySlice,
  setTaskDeadline,
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
