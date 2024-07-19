import { createSlice } from "@reduxjs/toolkit";

export const expenseTypeSlice = createSlice({
  name: "expenseType",
  initialState: {
    items: [],
    totals: 0,
    formValues: {
      name: "",
      status: 1,
    },
  },
  reducers: {
    setExpenseTypeItem: (state, action) => {
      state.items = action.payload;
    },
    setTotalExpenseType: (state, action) => {
      state.totals = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    resetFormValues: (state) => {
      state.formValues = {
        name: "",
        status: 1,
      };
    },
  },
});

export const {
  setExpenseTypeItem,
  setTotalExpenseType,
  setFormValues,
  resetFormValues,
} = expenseTypeSlice.actions;
export default expenseTypeSlice.reducer;
