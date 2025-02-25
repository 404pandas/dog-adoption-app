// external modules
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";

// local modules
import { addFavorite, removeFavorite } from "../../store/matchSlice";
import { RootState } from "../../store";
import "./dogcard.css";

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
  // state
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.match.favorites);
  const [isHovered, setIsHovered] = useState(false);

  // logic
  const isFavorite = favorites.some((fav) => fav.id === dog.id);

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      dispatch(addFavorite({ id: dog.id, name: dog.name }));
    } else {
      dispatch(removeFavorite(dog.id));
    }
  };

  return (
    <Card
      className='max-w-sm rounded-lg shadow-md m-4 dog'
      sx={{ position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardMedia component='img' height='300' image={dog.img} alt={dog.name} />
      <CardContent>
        <Typography variant='h6' className='font-bold'>
          {dog.name}
        </Typography>
        {isHovered && (
          <>
            <Typography variant='body2' color='textSecondary'>
              Breed: {dog.breed}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Age: {dog.age} years
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Zip Code: {dog.zip_code}
            </Typography>
          </>
        )}
      </CardContent>
      <IconButton
        onClick={handleFavoriteClick}
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
