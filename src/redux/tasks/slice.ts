import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';
import { v4 as uuidv4 } from 'uuid';
import { fetchTodo, addTask } from './asyncActions';

const initialState = [] as Todo[];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      console.log(action.payload);
      state.unshift(action.payload);
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(state, action: PayloadAction<{ completed: boolean; id: string }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
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

export const { addTodo, removeTodo, setTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;
