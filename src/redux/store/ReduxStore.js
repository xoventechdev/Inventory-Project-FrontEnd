import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "../slice/settings-slice";
import customerSlice from "../slice/customer-slice";
import userSlice from "../slice/user-slice";
import supplierSlice from "../slice/supplier-slice";
import categorySlice from "../slice/category-slice";
import expenseTypeSlice from "../slice/expenseType-slice";
import brandSlice from "../slice/brand-slice";
import productSlice from "../slice/product-slice";

export default configureStore({
  reducer: {
    settings: settingsSlice,
    customer: customerSlice,
    brand: brandSlice,
    user: userSlice,
    supplier: supplierSlice,
    category: categorySlice,
    expenseType: expenseTypeSlice,
    product: productSlice,
  },
});
