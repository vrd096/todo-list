import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
 
  },
});


export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();