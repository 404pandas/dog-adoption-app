import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the search query and results
interface SearchQuery {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  sort?: string;
}

interface SearchState {
  query: SearchQuery;
  results: {
    resultIds: string[];
    total: number;
    next: string | null;
    prev: string | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: {
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 25,
    size: 25,
    sort: "breed:asc",
  },
  results: null,
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Set search query (this will be used when the search form is submitted)
    setSearchQuery(state, action: PayloadAction<SearchQuery>) {
      state.query = action.payload;
    },
    // Set search results after making the API call
    setSearchResults(state, action: PayloadAction<SearchState["results"]>) {
      state.results = action.payload;
    },
    // Set loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    // Set error message
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setLoading, setError } =
  searchSlice.actions;

export default searchSlice.reducer;
