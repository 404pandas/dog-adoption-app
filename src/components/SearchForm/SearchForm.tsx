import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { searchDogs, getBreeds } from "../../api/dogRoutes";
import "./searchform.css";

// redux

import { RootState } from "../../store"; // Import RootState type
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../store/searchSlice"; // Assuming you have a redux slice for search results

const SearchForm = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query); // Get search query from Redux

  // Local state for form values
  const [formValues, setFormValues] = useState({
    breeds: searchQuery.breeds || undefined,
    zipCodes: searchQuery.zipCodes || undefined,
    ageMin: searchQuery.ageMin ?? undefined,
    ageMax: searchQuery.ageMax ?? undefined,
    size: searchQuery.size ?? 25,
    sort: searchQuery.sort,
    from: undefined,
  });

  // State for dog breeds
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch breeds when component mounts
  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const breedData = await getBreeds(); // Fetch breeds from the API
        setBreeds(breedData); // Set the breeds in the state
      } catch (error) {
        setError("Failed to load breeds:" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  // Handle form value change
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | string[]>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form values:", formValues);
    dispatch(setSearchQuery(formValues)); // Dispatch search values to Redux
    // Make API call here based on formValues
    try {
      const results = await searchDogs({
        breeds: formValues.breeds,
        zipCodes: formValues.zipCodes,
        ageMin: formValues.ageMin,
        ageMax: formValues.ageMax,
        size: formValues.size,
        sort: formValues.sort || "breed:asc",
        from: formValues.from,
      });
      console.log("Search Results:", results);
      // Handle the results (e.g., update the UI or store them in Redux)
    } catch (error) {
      console.error("Error during dog search:", error);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 test'>
      <h1 className='text-2xl mb-4'>Search Dogs</h1>

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
            ) : error ? (
              <MenuItem disabled>{error}</MenuItem>
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
        <div>
          <TextField
            label='Zip Code'
            name='zipCodes'
            value={formValues.zipCodes}
            onChange={handleChange}
            fullWidth
          />
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
    </div>
  );
};

export default SearchForm;
