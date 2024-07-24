import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    totals: 0,
    brandList: [],
    categoryList: [],
    formValues: {
      categoryId: "",
      brandId: "",
      name: "",
      unit: 0,
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
    setBrandDropDown: (state, action) => {
      state.brandList = action.payload;
    },
    setCategoryDropDown: (state, action) => {
      state.categoryList = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    resetFormValues: (state) => {
      state.formValues = {
        categoryId: "",
        brandId: "",
        name: "",
        unit: 0,
        details: "",
        status: 1,
      };
    },
  },
});

export const {
  setProductItem,
  setTotalProduct,
  setBrandDropDown,
  setCategoryDropDown,
  setFormValues,
  resetFormValues,
} = productSlice.actions;
export default productSlice.reducer;
