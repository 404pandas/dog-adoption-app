// external modules
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";

// local modules
import {
  setSearchQuery,
  setSearchResults,
  setDogSearchResults,
  setError,
} from "../../store/searchSlice";
import "./searchform.css";
import { store, RootState } from "../../store";
import { searchDogs, getBreeds, fetchDogsByIds } from "../../api/dogRoutes";
import { Dog, FavoriteDog } from "../../types/dog";

const SearchForm = () => {
  // state
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const [formValues, setFormValues] = useState({
    breeds: searchQuery.breeds || [],
    zipCodes: searchQuery.zipCodes || [],
    ageMin: searchQuery.ageMin ?? undefined,
    ageMax: searchQuery.ageMax ?? undefined,
    size: searchQuery.size ?? 25,
    sort: searchQuery.sort,
    from: undefined,
  });
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [zipInput, setZipInput] = useState("");
  const dogSearchResults = useSelector((state: RootState) => state.search.dogs);
  const [isFormMinimized, setIsFormMinimized] = useState(
    dogSearchResults.length > 0
  );

  // logic

  // fetches breeds when component mounts
  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const breedData = await getBreeds();
        setBreeds(breedData);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        store.dispatch(setError(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  // fetches dogs by ids
  const fetchDogs = async (breeds: string[]) => {
    setLoading(true);
    try {
      const dogData: Dog[] | FavoriteDog[] = await fetchDogsByIds(breeds);
      store.dispatch(setDogSearchResults(dogData));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
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
      setZipInput("");
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
    dispatch(setSearchQuery(formValues));
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

      fetchDogs(results.resultIds);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 fetch-green'>
      <h2 className='text-2xl mb-4'>Search Dogs</h2>
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
              label='Select Breed(s)'
              name='breeds'
              multiple
              value={formValues.breeds}
              onChange={handleChange}
              renderValue={(selected) =>
                selected.length > 0 ? selected.join(", ") : "Select Breed(s)"
              }
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
              {formValues.zipCodes.length > 0
                ? formValues.zipCodes.map((zip) => (
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
                : null}
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

          {/* search button */}
          <div className='flex justify-center'>
            <Button type='submit' variant='contained' className='w-full'>
              Search
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchForm;
