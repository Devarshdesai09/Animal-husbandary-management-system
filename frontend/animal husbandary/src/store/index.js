import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // <-- Make sure path is correct

const store = configureStore({
  reducer: {
    auth: authReducer, // <-- This connects your authSlice
  },
});

export default store;
