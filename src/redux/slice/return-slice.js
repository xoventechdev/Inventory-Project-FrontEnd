import { createSlice } from "@reduxjs/toolkit";

export const returnSlice = createSlice({
  name: "return",
  initialState: {
    list: [],
    totals: 0,
    customerList: [],
    productList: [],
    formValues: {
      customerId: "",
      vatTax: 0,
      discount: 0,
      otherCost: 0,
      shippingCost: 0,
      grandCost: 0,
      note: "",
    },
    returnItemList: [],
    itemFromValues: {
      productId: "",
      productName: "",
      returnId: "",
      qty: 0,
      unitCost: 0,
      total: 0,
    },
  },
  reducers: {
    setReturnList: (state, action) => {
      state.list = action.payload;
    },
    setReturnTotal: (state, action) => {
      state.totals = action.payload;
    },
    saveReturnItemList: (state, action) => {
      state.returnItemList.push(action.payload);
    },
    saveReturnItemListFromAPI: (state, action) => {
      state.returnItemList = action.payload;
    },
    removeReturnItemList: (state, action) => {
      state.returnItemList.splice(action.payload, 1);
    },
    emptyReturnItemList: (state, action) => {
      state.returnItemList = [];
    },
    setCustomerDropDown: (state, action) => {
      state.customerList = action.payload;
    },
    setProductDropDown: (state, action) => {
      state.productList = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    setItemFormValues: (state, action) => {
      state.itemFromValues = { ...state.itemFromValues, ...action.payload };
    },
    resetFormValues: (state) => {
      state.formValues = {
        customerId: "",
        vatTax: 0,
        discount: 0,
        otherCost: 0,
        shippingCost: 0,
        grandCost: 0,
        note: "",
      };
    },
    resetItemFormValues: (state) => {
      state.itemFromValues = {
        productId: "",
        productName: "",
        returnId: "",
        qty: 0,
        unitCost: 0,
        total: 0,
      };
    },
  },
});

export const {
  setReturnList,
  setReturnTotal,
  saveReturnItemList,
  saveReturnItemListFromAPI,
  removeReturnItemList,
  emptyReturnItemList,
  setCustomerDropDown,
  setProductDropDown,
  setFormValues,
  setItemFormValues,
  resetFormValues,
  resetItemFormValues,
} = returnSlice.actions;
export default returnSlice.reducer;
