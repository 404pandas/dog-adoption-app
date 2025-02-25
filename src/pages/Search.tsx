// external modules
import React, { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";

// local modules
import SearchForm from "../components/SearchForm/SearchForm";
import DogCard from "../components/DogCard/DogCard";
import { Dog } from "../types/dog";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import FavoritesDrawer from "../components/FavoritesDrawer/FavoritesDrawer";
import {
  setDogSearchResults,
  setError,
  setLoading,
  setSearchResults,
} from "../store/searchSlice";
import { fetchDogsByIds, searchDogs } from "../api/dogRoutes";
import { RootState } from "../store";

const Search = () => {
  // state
  const dispatch = useDispatch();
  const { query, results, isLoading, dogs } = useSelector(
    (state: RootState) => state.search
  );
  const defaultRowsPerPage = query.size || 10;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // logic
  useEffect(() => {
    const fetchDogs = async () => {
      dispatch(setLoading(true));
      try {
        const searchResults = await searchDogs({
          ...query,
          size: rowsPerPage,
          from: page * rowsPerPage,
          ageMin: query.ageMin ?? undefined,
          ageMax: query.ageMax ?? undefined,
          sort: query.sort ?? undefined,
        });

        dispatch(setSearchResults(searchResults));

        if (searchResults.resultIds.length) {
          const dogDetails = await fetchDogsByIds(searchResults.resultIds);
          dispatch(setDogSearchResults(dogDetails));
        }
      } catch (error) {
        dispatch(setError("Failed to fetch dogs"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDogs();
  }, [query, page, rowsPerPage, dispatch]);

  // Handle Pagination Changes
  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen body'>
      <FavoritesDrawer />
      <SearchForm />
      <ErrorMessage />
      <h2 className='results'>Results</h2>
      {isLoading && <p>Loading dogs...</p>}

      {/* MUI Table Pagination */}
      <TablePagination
        component='div'
        count={results?.total || 0}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {dogs.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {dogs.map((dog: Dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      ) : (
        !isLoading && <p>No results found.</p>
      )}
    </div>
  );
};

export default Search;
