import { configureStore } from "@reduxjs/toolkit";
import modalreducer from "./Slice/ModalSlice";
import loaderReducer from "./Slice/LoaderSlice";
import authReducer from "../Redux/Slice/authSlice"
export const store = configureStore({
  reducer: {
    modal: modalreducer,
    loader:loaderReducer,
    auth:authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;