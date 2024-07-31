import { createSlice } from "@reduxjs/toolkit";

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    list: [],
    totals: 0,
    supplierList: [],
    productList: [],
    formValues: {
      supplierId: "",
      vatTax: 0,
      discount: 0,
      otherCost: 0,
      shippingCost: 0,
      grandCost: 0,
      note: "",
    },
    purchaseItemList: [],
    itemFromValues: {
      productId: "",
      productName: "",
      purchaseId: "",
      qty: 0,
      unitCost: 0,
      total: 0,
    },
  },
  reducers: {
    setPurchaseList: (state, action) => {
      state.list = action.payload;
    },
    setPurchaseTotal: (state, action) => {
      state.totals = action.payload;
    },
    savePurchaseItemList: (state, action) => {
      state.purchaseItemList.push(action.payload);
    },
    removePurchaseItemList: (state, action) => {
      state.purchaseItemList.splice(action.payload, 1);
    },
    emptyPurchaseItemList: (state, action) => {
      state.purchaseItemList = [];
    },
    setSupplierDropDown: (state, action) => {
      state.supplierList = action.payload;
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
        supplierId: "",
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
        purchaseId: "",
        qty: 0,
        unitCost: 0,
        total: 0,
      };
    },
  },
});

export const {
  setPurchaseList,
  setPurchaseTotal,
  savePurchaseItemList,
  removePurchaseItemList,
  emptyPurchaseItemList,
  setSupplierDropDown,
  setProductDropDown,
  setFormValues,
  setItemFormValues,
  resetFormValues,
  resetItemFormValues,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
