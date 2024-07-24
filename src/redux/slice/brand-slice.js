import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
  name: "brand",
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
    setBrandItem: (state, action) => {
      state.items = action.payload;
    },
    setTotalBrand: (state, action) => {
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

export const { setBrandItem, setTotalBrand, setFormValues, resetFormValues } =
  brandSlice.actions;
export default brandSlice.reducer;
