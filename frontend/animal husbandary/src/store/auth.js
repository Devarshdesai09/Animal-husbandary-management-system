import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,    // will hold { id, role }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      // Optional: clear localStorage here if you want
    },
    setUser(state, action) {
      state.user = action.payload; // payload = { id, role }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
