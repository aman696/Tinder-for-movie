// src/components/CommonSuggestion.js

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CommonSuggestion = ({ movie, onRestart }) => {
  if (!movie) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h5" gutterBottom>
          No Suggestion Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Unfortunately, we couldn't find a common movie based on your selections.
        </Typography>
        <Button variant="contained" color="primary" onClick={onRestart}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Common Movie Suggestion
      </Typography>
      <Card
        sx={{
          maxWidth: 400,
          margin: '0 auto',
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
        }}
      >
        {/* Placeholder for Movie Poster */}
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundColor: '#424242',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MovieIcon sx={{ fontSize: 80, color: '#90caf9' }} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genres: {movie.genres.join(', ')}
          </Typography>
        </CardContent>
      </Card>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckCircleIcon />}
          onClick={onRestart}
        >
          Start Over
        </Button>
      </Box>
    </Box>
  );
};

export default CommonSuggestion;
