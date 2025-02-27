import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    access_token: "",
    isAdmin: false,
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.account = {
        ...state.account,
        id: action.payload?.DT?._id || "",
        name: action.payload?.DT?.name || "",
        email: action.payload?.DT?.email || "",
        phone: action.payload?.DT?.phone || "",
        address: action.payload?.DT?.address || "",
        avatar: action.payload?.DT?.avatar || "",
        isAdmin: action.payload?.DT?.isAdmin,
      };
      state.isAuth = true;
    },
    updateAccessToken: (state, action) => {
      state.account.access_token = action.payload?.DT?.access_token;
    },
    logout: (state) => {
      state.account = initialState.account;
      state.isAuth = false;
    },
  },
});

export const { login, logout, updateAccessToken } = userSlice.actions;

export default userSlice.reducer;
