import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasks/slice';

export const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();