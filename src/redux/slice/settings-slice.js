import { createSlice } from "@reduxjs/toolkit";
export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    loader: "d-none",
    recoverMode: false,
  },
  reducers: {
    ShowLoader: (state) => {
      state.loader = "";
    },
    HideLoader: (state) => {
      state.loader = "d-none";
    },
    onRecoverMode: (state) => {
      state.recoverMode = true;
    },
    offRecoverMode: (state) => {
      state.recoverMode = false;
    },
  },
});
export const { ShowLoader, HideLoader, onRecoverMode, offRecoverMode } =
  settingsSlice.actions;
export default settingsSlice.reducer;
