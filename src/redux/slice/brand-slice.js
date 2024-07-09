import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    items: [],
    totals: 0,
    formValues: {
      name: "Ami a",
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
      state.formValues[`${action.payload["name"]}`] = action.payload["value"];
    },
    resetFormValues: (state) => {
      state.formValues = {
        name: "",
      };
    },
  },
});

export const { setBrandItem, setTotalBrand, setFormValues, resetFormValues } =
  brandSlice.actions;
export default brandSlice.reducer;
