import { createSlice } from '@reduxjs/toolkit';

interface TaskDetailsState {
  isDetailsOpen: boolean;
  data: {};
}

const initialState: TaskDetailsState = {
  isDetailsOpen: false,
  data: {},
};

const taskDetailsSlice = createSlice({
  name: 'taskDetails',
  initialState,
  reducers: {
    toggleTaskDetails(state) {
      state.isDetailsOpen = !state.isDetailsOpen;
    },
    dataTaskDetails(state, action) {
      state.data = action.payload;
    },
  },
});

export const { toggleTaskDetails, dataTaskDetails } = taskDetailsSlice.actions;

export default taskDetailsSlice.reducer;
