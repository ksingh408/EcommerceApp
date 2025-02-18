
import { createSlice } from "@reduxjs/toolkit";
import userData from "../../JsonData/Users.json"

const initialState = {
  users: userData.users ||[],
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null; 
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;

