import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    totals: 0,
    formValues: {
      categoryId: "",
      brandId: "",
      name: "",
      unit: "",
      details: "",
      status: 1,
    },
  },
  reducers: {
    setProductItem: (state, action) => {
      state.items = action.payload;
    },
    setTotalProduct: (state, action) => {
      state.totals = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    resetFormValues: (state) => {
      state.formValues = {
        categoryId: "",
        brandId: "",
        name: "",
        unit: "",
        details: "",
        status: 1,
      };
    },
  },
});

export const {
  setProductItem,
  setTotalProduct,
  setFormValues,
  resetFormValues,
} = productSlice.actions;
export default productSlice.reducer;
