// DogCard.tsx
import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

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
  return (
    <Card className='max-w-sm rounded-lg shadow-md m-4'>
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
    </Card>
  );
};

export default DogCard;
