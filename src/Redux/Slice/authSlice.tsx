import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type User = {
  _id?:string,
  name?: string;
  email?: string;
  [key: string]: any;
};

type UserData = {
  token: string;
  user: User;
};

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  userdata: UserData | null;
};

const token = Cookies.get("token");
const rawUserdata = Cookies.get("userdata");
const seconds = 3600;
const days = seconds / (60 * 60 * 24);

const parsedUserdata: UserData | null = rawUserdata
  ? JSON.parse(rawUserdata)
  : null;

const initialState: AuthState = {
  isAuthenticated: !!token,
  token: token || null,
  userdata: parsedUserdata,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userdata = action.payload;
      Cookies.set("token", action.payload.token, { expires: days });
      Cookies.set("userdata", JSON.stringify(action.payload), { expires: days });
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userdata = null;

      Cookies.remove("token");
      Cookies.remove("userdata");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
