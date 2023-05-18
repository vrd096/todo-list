import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import sidebarSlice from './sidebar/slice';
import { todoReducer } from './tasks/slice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    sidebar: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
