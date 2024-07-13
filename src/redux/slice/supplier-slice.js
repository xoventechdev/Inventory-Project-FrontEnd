import { createSlice } from "@reduxjs/toolkit";

export const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    items: [],
    totals: 0,
    formValues: {
      name: "",
      mobile: "",
      email: "",
      address: "",
      photo: "",
      status: 1,
    },
  },
  reducers: {
    setSupplierItem: (state, action) => {
      state.items = action.payload;
    },
    setTotalSupplier: (state, action) => {
      state.totals = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    resetFormValues: (state) => {
      state.formValues = {
        name: "",
        mobile: "",
        email: "",
        address: "",
        photo: "",
        status: "",
      };
    },
  },
});

export const {
  setSupplierItem,
  setTotalSupplier,
  setFormValues,
  resetFormValues,
} = supplierSlice.actions;
export default supplierSlice.reducer;
