import { createSlice } from "@reduxjs/toolkit";

export const salesSlice = createSlice({
  name: "sales",
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
    salesItemList: [],
    itemFromValues: {
      productId: "",
      productName: "",
      salesId: "",
      qty: 0,
      unitCost: 0,
      total: 0,
    },
  },
  reducers: {
    setSalesList: (state, action) => {
      state.list = action.payload;
    },
    setSalesTotal: (state, action) => {
      state.totals = action.payload;
    },
    saveSalesItemList: (state, action) => {
      state.salesItemList.push(action.payload);
    },
    saveSalesItemListFromAPI: (state, action) => {
      state.salesItemList = action.payload;
    },
    removeSalesItemList: (state, action) => {
      state.salesItemList.splice(action.payload, 1);
    },
    emptySalesItemList: (state, action) => {
      state.salesItemList = [];
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
        salesId: "",
        qty: 0,
        unitCost: 0,
        total: 0,
      };
    },
  },
});

export const {
  setSalesList,
  setSalesTotal,
  saveSalesItemList,
  saveSalesItemListFromAPI,
  removeSalesItemList,
  emptySalesItemList,
  setCustomerDropDown,
  setProductDropDown,
  setFormValues,
  setItemFormValues,
  resetFormValues,
  resetItemFormValues,
} = salesSlice.actions;
export default salesSlice.reducer;
