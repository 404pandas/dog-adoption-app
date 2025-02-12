import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/searchSlice"; // Assuming you have a redux slice for search results
import "./searchform.css";

const SearchForm = () => {
  const dispatch = useDispatch();

  // Local state to manage form values and errors
  const [formValues, setFormValues] = useState({
    breeds: [],
    zipCodes: "",
    ageMin: "",
    ageMax: "",
    size: 25,
    sort: "breed:asc",
  });

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form values:", formValues);
    dispatch(setSearchQuery(formValues)); // Dispatch search values to Redux
    // Make API call here based on formValues
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
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
            {[
              "Labrador",
              "Poodle",
              "Bulldog",
              "Beagle",
              "Golden Retriever",
            ].map((breed) => (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            ))}
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
              value={formValues.sort}
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
