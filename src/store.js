import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./redux/jobSlice";

const store = configureStore({
  reducer: {
    getAllJobList: jobSlice,
  },
});

export default store;
