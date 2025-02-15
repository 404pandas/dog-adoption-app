import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the search query and results
interface SearchQuery {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number | null;
  ageMax?: number | null;
  size?: number;
  sort?: string | null;
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
  error: unknown;
  dogs: DogResults[];
}

interface DogResults {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
}

const initialState: SearchState = {
  query: {
    breeds: [],
    zipCodes: [],
    ageMin: undefined,
    ageMax: undefined,
    size: 25,
    sort: "breed:asc",
  },
  results: null,
  isLoading: false,
  error: null,
  dogs: [],
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
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // Set dog results
    setDogSearchResults(state, action: PayloadAction<DogResults[]>) {
      state.dogs = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setLoading,
  setError,
  setDogSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
