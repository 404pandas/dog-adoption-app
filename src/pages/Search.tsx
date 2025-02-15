import React from "react";
import SearchForm from "../components/SearchForm/SearchForm";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Import RootState type
import DogCard from "../components/DogCard/DogCard";
import { Dog } from "../types/dog";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import FavoritesDrawer from "../components/FavoritesDrawer/FavoritesDrawer";

const Search = () => {
  const dogs = useSelector((state: RootState) => state.search.dogs);

  return (
    <div>
      <FavoritesDrawer />
      <SearchForm />
      <ErrorMessage />
      Results
      {dogs.map((dog: Dog) => {
        return <DogCard key={dog.id} dog={dog} />;
      })}
    </div>
  );
};

export default Search;
