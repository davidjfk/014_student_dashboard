import { createSlice } from "@reduxjs/toolkit";

export const studentsMockdataSlice = createSlice({
  name: "studentsMockData",
  initialState: {
    studentsMockData: []
  },
  reducers: {
    addStudentsMockdataToReduxToolkit: (state, action) => {
      const studentsMockdata2 = action.payload;
      state.studentsMockData = studentsMockdata2;
    }}
})
export const { 
    addStudentsMockdataToReduxToolkit
} = studentsMockdataSlice.actions;

export default studentsMockdataSlice.reducer;    