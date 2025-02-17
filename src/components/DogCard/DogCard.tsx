// DogCard.tsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { addFavorite, removeFavorite } from "../../store/matchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../store";

type DogCardProps = {
  dog: {
    img: string;
    name: string;
    age: number;
    breed: string;
    zip_code: string;
    id: string;
  };
};

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.match.favorites);
  const isFavorite = favorites.includes(dog.id);

  const handleFavoriteClick = (id: string) => {
    console.log("Updated Favorites:", store.getState().match.favorites); // Now should show the latest state
    const alreadyThere = favorites.includes(id);

    if (!alreadyThere) {
      // Add to favorites
      dispatch(addFavorite(id));
      console.log(favorites);
    } else {
      // Remove from favorites
      dispatch(removeFavorite(id));
      console.log(favorites);
    }
  };

  return (
    <Card
      className='max-w-sm rounded-lg shadow-md m-4'
      sx={{ position: "relative" }}
    >
      <CardMedia component='img' height='200' image={dog.img} alt={dog.name} />
      <CardContent>
        <Typography variant='h6' className='font-bold'>
          {dog.name}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Breed: {dog.breed}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Age: {dog.age} years
        </Typography>
      </CardContent>
      <IconButton
        onClick={() => handleFavoriteClick(dog.id)}
        color={isFavorite ? "secondary" : "default"}
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
};

export default DogCard;
