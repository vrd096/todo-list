import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todosReducer from './tasks/slice';
import sidebarSlice from './sidebar/slice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    sidebar: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
