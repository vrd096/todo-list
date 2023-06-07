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
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(state, action: PayloadAction<{ id: string; completed: boolean }>) {
      state
        .filter((todo) => todo.id === action.payload.id)
        .forEach((todo) => {
          todo.completed = !action.payload.completed;
        });
    },
    setImportStatus(state, action: PayloadAction<{ id: string; important: boolean }>) {
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

export const { addTodo, removeTodo, setTodoStatus, setImportStatus } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
