import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "../slice/settings-slice";
import brandSlice from "../slice/brand-slice";

export default configureStore({
  reducer: {
    settings: settingsSlice,
    brand: brandSlice,
  },
});
