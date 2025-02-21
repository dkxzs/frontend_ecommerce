import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    name: "",
    email: "",
    access_token: "",
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.account = {
        name: action.payload.DT.user.name,
        email: action.payload.DT.user.email,
        access_token: action.payload.DT.access_token,
      };
      state.isAuth = true;
    },
    logout: (state) => {
      state.account = initialState.account;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
