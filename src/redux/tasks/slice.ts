import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';
import { fetchTodo } from './asyncActions';

const initialState = [] as Todo[];

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
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {});
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {});
  },
});

export const { addTodo, removeTodo, setTodoStatus, resetState } = todoSlice.actions;
export default todoSlice.reducer;
