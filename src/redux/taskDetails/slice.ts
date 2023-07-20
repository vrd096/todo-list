import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    openDetails(state) {
      if (!state.isDetailsOpen) {
        state.isDetailsOpen = true;
      }
    },
    closeTaskDetails(state) {
      if (state.isDetailsOpen) {
        state.isDetailsOpen = false;
      }
    },
    // toggleTaskDetails(state) {
    //   state.isDetailsOpen = !state.isDetailsOpen;
    // },
    dataTaskDetails(state, action) {
      state.data = action.payload;
    },
  },
});

export const { dataTaskDetails, openDetails, closeTaskDetails } = taskDetailsSlice.actions;

export default taskDetailsSlice.reducer;
