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
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites = [...state.favorites, action.payload]; // Immutable update
      }
    },
    // Remove dog from favorites
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload); // Immutable update
    },
  },
});

export const { setMatch, addFavorite, removeFavorite } = matchSlice.actions;
export default matchSlice.reducer;
