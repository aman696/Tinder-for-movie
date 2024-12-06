// src/components/MovieCard.js

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const MovieCard = ({ movie, onSwipe }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genres: {movie.genres.join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="space-around" width="100%">
          <Button
            size="small"
            color="primary"
            startIcon={<ThumbUpIcon />}
            onClick={() => onSwipe(movie.id)}
          >
            Like
          </Button>
          <Button
            size="small"
            color="secondary"
            startIcon={<ThumbDownIcon />}
            onClick={() => onSwipe(null)}
          >
            Dislike
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
