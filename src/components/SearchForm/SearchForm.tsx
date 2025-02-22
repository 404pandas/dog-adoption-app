import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"; // For the expand/collapse icon

import { searchDogs, getBreeds, fetchDogsByIds } from "../../api/dogRoutes";
import "./searchform.css";
import { Dog, FavoriteDog } from "../../types/dog";
// redux
import { store } from "../../store";

import { RootState } from "../../store"; // Import RootState type
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSearchResults,
  setDogSearchResults,
  setError,
} from "../../store/searchSlice"; // Assuming you have a redux slice for search results

const SearchForm = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query); // Get search query from Redux
  // Local state for form values
  const [formValues, setFormValues] = useState({
    breeds: searchQuery.breeds || [],
    zipCodes: searchQuery.zipCodes || [],
    ageMin: searchQuery.ageMin ?? undefined,
    ageMax: searchQuery.ageMax ?? undefined,
    size: searchQuery.size ?? 25,
    sort: searchQuery.sort,
    from: undefined,
  });

  // State for dog breeds
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [zipInput, setZipInput] = useState("");
  const dogSearchResults = useSelector((state: RootState) => state.search.dogs); // Get dog search results from Redux

  const [isFormMinimized, setIsFormMinimized] = useState(
    dogSearchResults.length > 0
  );

  // Fetch breeds when component mounts
  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const breedData = await getBreeds(); // Fetch breeds from the API
        setBreeds(breedData); // Set the breeds in the state
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        store.dispatch(setError(errorMessage)); // Dispatching the error message as string
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const fetchDogs = async (breeds: string[]) => {
    setLoading(true);
    try {
      const dogData: Dog[] | FavoriteDog[] = await fetchDogsByIds(breeds);
      store.dispatch(setDogSearchResults(dogData));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage)); // Dispatching the error message as string
    } finally {
      setLoading(false);
    }
  };

  // Handle form value change
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | string[]>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle zip code input change
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipInput(e.target.value);
  };

  // Add a zip code to the list
  const handleAddZipCode = () => {
    if (zipInput.trim() !== "" && !formValues.zipCodes.includes(zipInput)) {
      setFormValues((prev) => ({
        ...prev,
        zipCodes: [...prev.zipCodes, zipInput.trim()],
      }));
      setZipInput(""); // Clear input after adding
    }
  };

  // Remove a zip code from the list
  const handleRemoveZipCode = (zip: string) => {
    setFormValues((prev) => ({
      ...prev,
      zipCodes: prev.zipCodes.filter((z) => z !== zip),
    }));
  };

  // Toggle form minimization
  const toggleFormMinimization = () => {
    setIsFormMinimized((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    setIsFormMinimized(true);
    dispatch(setError(""));
    dispatch(setDogSearchResults([]));
    e.preventDefault();
    dispatch(setSearchQuery(formValues)); // Dispatch search values to Redux
    // Make API call here based on formValues
    try {
      setLoading(true);
      const results = await searchDogs({
        breeds: formValues.breeds,
        zipCodes: formValues.zipCodes,
        ageMin: formValues.ageMin,
        ageMax: formValues.ageMax,
        size: formValues.size,
        sort: formValues.sort || "breed:asc",
        from: formValues.from,
      });
      dispatch(setSearchResults(results));

      // Handle the results (e.g., update the UI or store them in Redux)
      fetchDogs(results.resultIds);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage)); // Dispatching the error message as string
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 test'>
      <h1 className='text-2xl mb-4'>Search Dogs</h1>
      <div className='flex justify-end'>
        <IconButton onClick={toggleFormMinimization}>
          {isFormMinimized ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </div>
      {!isFormMinimized && (
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Breeds */}
          <div>
            <InputLabel id='breeds-label'>Breeds</InputLabel>
            <Select
              labelId='breeds-label'
              id='breeds'
              name='breeds'
              multiple
              value={formValues.breeds}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {loading ? (
                <MenuItem disabled>Loading breeds...</MenuItem>
              ) : (
                breeds.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    {breed}
                  </MenuItem>
                ))
              )}
            </Select>
          </div>

          {/* Zip Code */}
          {/* Zip Code Input & List */}
          <div>
            <TextField
              label='Zip Code'
              name='zipInput'
              value={zipInput}
              onChange={handleZipChange}
              fullWidth
            />
            <Button
              variant='contained'
              color='secondary'
              onClick={handleAddZipCode}
              className='mt-2'
              disabled={!zipInput.trim()}
            >
              Add Zip Code
            </Button>

            {/* Display added zip codes */}
            <div className='mt-4'>
              {formValues.zipCodes.length > 0 ? (
                formValues.zipCodes.map((zip) => (
                  <div
                    key={zip}
                    className='flex justify-between items-center mt-2 border p-2 rounded'
                  >
                    <span>{zip}</span>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => handleRemoveZipCode(zip)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <p>No zip codes added yet.</p>
              )}
            </div>
          </div>

          {/* Age */}
          <div className='flex gap-4'>
            <TextField
              label='Min Age'
              name='ageMin'
              type='number'
              value={formValues.ageMin}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label='Max Age'
              name='ageMax'
              type='number'
              value={formValues.ageMax}
              onChange={handleChange}
              fullWidth
            />
          </div>

          {/* Size */}
          <div>
            <TextField
              label='Results Size'
              name='size'
              type='number'
              value={formValues.size}
              onChange={handleChange}
              fullWidth
            />
          </div>

          {/* Sort */}
          <div>
            <FormControl fullWidth>
              <InputLabel id='sort-label'>Sort By</InputLabel>
              <Select
                labelId='sort-label'
                name='sort'
                value={formValues.sort || "breed:asc"}
                onChange={handleChange}
              >
                <MenuItem value='breed:asc'>Breed (Ascending)</MenuItem>
                <MenuItem value='breed:desc'>Breed (Descending)</MenuItem>
                <MenuItem value='name:asc'>Name (Ascending)</MenuItem>
                <MenuItem value='name:desc'>Name (Descending)</MenuItem>
                <MenuItem value='age:asc'>Age (Ascending)</MenuItem>
                <MenuItem value='age:desc'>Age (Descending)</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='flex justify-center'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='w-full'
            >
              Search
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchForm;
