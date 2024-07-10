import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customer",
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
    setCustomerItem: (state, action) => {
      state.items = action.payload;
    },
    setTotalCustomer: (state, action) => {
      state.totals = action.payload;
    },
    setFormValues: (state, action) => {
      const { name, value } = action.payload;
      state.formValues[name] = value;
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
  setCustomerItem,
  setTotalCustomer,
  setFormValues,
  resetFormValues,
} = customerSlice.actions;
export default customerSlice.reducer;
