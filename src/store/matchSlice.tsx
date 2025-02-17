import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteDog {
  id: string;
  name: string;
}

interface MatchState {
  favorites: FavoriteDog[];
  match: string;
}

const initialState: MatchState = {
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
    addFavorite: (state, action: PayloadAction<FavoriteDog>) => {
      if (!state.favorites.some((fav) => fav.id === action.payload.id)) {
        state.favorites.push(action.payload); // Immutable update not needed due to immer
      }
    },
    // Remove dog from favorites
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
    },
  },
});

export const { setMatch, addFavorite, removeFavorite } = matchSlice.actions;
export default matchSlice.reducer;
