import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    isAuthenticated: false,
  },
  reducers: {
    addUserToRedux(state, action) {
      const data = action.payload;
      // console.log("data from redux:", data);
      state.isAuthenticated = true;
      state.userDetails = data;
    },
    removeUserFromRedux(state, action) {
      state.isAuthenticated = false;
      state.userDetails = {};
    },
    updateUserInRedux(state, action) {
      state.userDetails = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { addUserToRedux, removeUserFromRedux, updateUserInRedux } =
  userSlice.actions;
export default userSlice.reducer;
