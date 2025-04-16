const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
});

export const authSelector = (store) => store.auth;
export const authReducer = authSlice.reducer;
export default authSlice;
