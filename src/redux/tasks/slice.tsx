import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    addItem: (state, action) => {
      //   console.log(state);
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = tasksSlice.actions;

export default tasksSlice.reducer;
