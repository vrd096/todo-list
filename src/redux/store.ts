import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import sidebarSlice from './sidebar/slice';
import { todoReducer } from './tasks/slice';
import taskDetailsSlice from './taskDetails/slice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    sidebar: sidebarSlice,
    taskDetails: taskDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
