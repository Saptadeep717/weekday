import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobList: [],
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addAllJobs: (state, action) => {
      state.jobList = [...state.jobList, ...action.payload];
    },
  },
});

export const { addAllJobs, addFilterList } = jobSlice.actions;
export default jobSlice.reducer;
