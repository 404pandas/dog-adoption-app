import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import matchReducer from "./matchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    match: matchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
