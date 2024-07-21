import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    items: [],
    totals: 0,
    typesList: [],
    formValues: {
      typeID: "",
      name: "",
      amount: 0,
      note: "",
    },
  },
  reducers: {
    setExpenseItem: (state, action) => {
      state.items = action.payload;
    },
    setExpenseTypesList: (state, action) => {
      state.typesList = action.payload;
    },
    setTotalExpense: (state, action) => {
      state.totals = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    resetFormValues: (state) => {
      state.formValues = {
        typeID: "",
        name: "",
        amount: 0,
        note: "",
      };
    },
  },
});

export const {
  setExpenseItem,
  setExpenseTypesList,
  setTotalExpense,
  setFormValues,
  resetFormValues,
} = expenseSlice.actions;
export default expenseSlice.reducer;
