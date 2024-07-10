import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    items: [],
    totals: 0,
    formValues: {
      name: "",
      image: "",
      state: 1,
    },
    perPage: 5,
    searchKeyword: "0",
    pageNumber: 1,
  },
  reducers: {
    setBrandItem: (state, action) => {
      state.items = action.payload;
    },
    setTotalBrand: (state, action) => {
      state.totals = action.payload;
    },
    setFormValues: (state, action) => {
      const { name, value } = action.payload;
      state.formValues[name] = value;
    },
    resetFormValues: (state) => {
      state.formValues = {
        name: "",
      };
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const {
  setBrandItem,
  setTotalBrand,
  setFormValues,
  resetFormValues,
  setPerPage,
  setPageNumber,
} = brandSlice.actions;
export default brandSlice.reducer;
