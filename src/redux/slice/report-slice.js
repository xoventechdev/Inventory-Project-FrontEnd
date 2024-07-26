import { createSlice } from "@reduxjs/toolkit";
export const reportSlice = createSlice({
  name: "report",
  initialState: {
    salesReport: [],
    returnReport: [],
    purchaseReport: [],
    expenseReport: [],
  },
  reducers: {
    setSalesReport: (state, actions) => {
      state.salesReport = actions.payload;
    },
    setReturnReport: (state, actions) => {
      state.returnReport = actions.payload;
    },
    setPurchaseReport: (state, actions) => {
      state.purchaseReport = actions.payload;
    },
    setExpenseReport: (state, actions) => {
      state.expenseReport = actions.payload;
    },
  },
});
export const {
  setSalesReport,
  setReturnReport,
  setPurchaseReport,
  setExpenseReport,
} = reportSlice.actions;
export default reportSlice.reducer;
