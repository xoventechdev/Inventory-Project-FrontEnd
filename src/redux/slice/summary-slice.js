import { createSlice } from "@reduxjs/toolkit";
export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    salesSummary: [],
    returnSummary: [],
    purchaseSummary: [],
    expenseSummary: [],
  },
  reducers: {
    setSalesSummary: (state, actions) => {
      state.salesSummary = actions.payload;
    },
    setReturnSummary: (state, actions) => {
      state.returnSummary = actions.payload;
    },
    setPurchaseSummary: (state, actions) => {
      state.purchaseSummary = actions.payload;
    },
    setExpenseSummary: (state, actions) => {
      state.expenseSummary = actions.payload;
    },
  },
});
export const {
  setSalesSummary,
  setReturnSummary,
  setPurchaseSummary,
  setExpenseSummary,
} = summarySlice.actions;
export default summarySlice.reducer;
