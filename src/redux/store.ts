import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todosReducer from './tasks/slice';

export const store = configureStore({
  reducer: todosReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
