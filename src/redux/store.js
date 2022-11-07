import { configureStore } from "@reduxjs/toolkit";
import studentsMockdataReducer from "./studentsMockdataSlice";

export default configureStore({
  reducer: {
    studentsMockdata: studentsMockdataReducer
  }
});
