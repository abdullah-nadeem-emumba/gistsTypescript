import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/types";
import { USER } from "../constants/constants";

const initialState: UserType = {
  username: "",
  token: "",
  url: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = { ...USER };
    },
    logout: (state) => {
      state = {
        username: "",
        token: "",
        url: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
