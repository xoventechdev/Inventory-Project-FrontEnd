import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    value: [],
  },
  reducers: {
    setUserDetail: (state, actions) => {
      state.value = actions.payload;
    },
  },
});
export const { setUserDetail } = userSlice.actions;
export default userSlice.reducer;
