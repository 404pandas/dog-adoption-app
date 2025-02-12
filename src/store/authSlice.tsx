import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  withCredentials: boolean;
}

const initialState: AuthState = {
  withCredentials: true, // Default to true for login/logout requests
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setWithCredentials: (state, action: PayloadAction<boolean>) => {
      state.withCredentials = action.payload;
    },
  },
});

export const { setWithCredentials } = authSlice.actions;
export default authSlice.reducer;
