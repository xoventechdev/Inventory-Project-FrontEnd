import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    totals: 0,
    formValues: {
      name: "",
      photo: "",
      status: 1,
    },
  },
  reducers: {
    setCategoryItem: (state, action) => {
      state.items = action.payload;
    },
    setTotalCategory: (state, action) => {
      state.totals = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    resetFormValues: (state) => {
      state.formValues = {
        name: "",
        photo: "",
        status: 1,
      };
    },
  },
});

export const {
  setCategoryItem,
  setTotalCategory,
  setFormValues,
  resetFormValues,
} = categorySlice.actions;
export default categorySlice.reducer;
