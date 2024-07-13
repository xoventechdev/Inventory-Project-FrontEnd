import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "../slice/settings-slice";
import brandSlice from "../slice/brand-slice";
import customerSlice from "../slice/customer-slice";
import userSlice from "../slice/user-slice";
import supplierSlice from "../slice/supplier-slice";

export default configureStore({
  reducer: {
    settings: settingsSlice,
    customer: customerSlice,
    brand: brandSlice,
    user: userSlice,
    supplier: supplierSlice,
  },
});
