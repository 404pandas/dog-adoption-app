import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface matchState {
  favorites: string[];
  match: string;
}

const initialState: matchState = {
  favorites: [],
  match: "", // Default to true for login/logout requests
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    // Create a match
    setMatch: (state, action: PayloadAction<string>) => {
      state.match = action.payload;
    },
    // Add dog to favorites
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload); // Add dog id to favorites if not already present
      }
    },
    // Remove dog from favorites
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((id) => id !== action.payload); // Remove dog id from favorites
    },
  },
});

export const { setMatch, addFavorite, removeFavorite } = matchSlice.actions;
export default matchSlice.reducer;
