import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  reduxCredentials: boolean;
}

const initialState: AuthState = {
  reduxCredentials: false, // Default to true for login/logout requests
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setReduxCredentials: (state, action: PayloadAction<boolean>) => {
      state.reduxCredentials = action.payload;
    },
  },
});

export const { setReduxCredentials } = authSlice.actions;
export default authSlice.reducer;
