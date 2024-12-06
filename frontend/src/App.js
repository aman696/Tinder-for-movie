// src/App.js

import React, { useState } from 'react';
import GenreSelection from './components/GenreSelection';
import SwipeMovies from './components/SwipeMovies';
import CommonSuggestion from './components/CommonSuggestion';
import { getMovies, getCommonSuggestion } from './services/api';
import { Box, Typography, Container, CssBaseline } from '@mui/material';

const App = () => {
  const [stage, setStage] = useState('genre'); // stages: 'genre', 'swipe', 'suggestion'
  const [user1Movies, setUser1Movies] = useState([]);
  const [user2Movies, setUser2Movies] = useState([]);
  const [commonMovie, setCommonMovie] = useState(null);

  const handleGenreSubmit = (user1_genres, user2_genres) => {
    getMovies(user1_genres, user2_genres)
      .then((response) => {
        setUser1Movies(response.data.user1_swipe);
        setUser2Movies(response.data.user2_swipe);
        setStage('swipe');
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        alert('Failed to fetch movies. Please try again.');
      });
  };

  const handleSwipeComplete = (user1_selection, user2_selection) => {
    getCommonSuggestion(user1_selection, user2_selection)
      .then((response) => {
        setCommonMovie(response.data.common_movie);
        setStage('suggestion');
      })
      .catch((error) => {
        console.error('Error fetching suggestion:', error);
        alert('Failed to fetch suggestion. Please try again.');
      });
  };

  const handleRestart = () => {
    setStage('genre');
    setUser1Movies([]);
    setUser2Movies([]);
    setCommonMovie(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="md" sx={{ flexGrow: 1 }}>
          <Typography variant="h3" align="center" gutterBottom mt={4}>
            Movie Tinder
          </Typography>
          {stage === 'genre' && <GenreSelection onSubmit={handleGenreSubmit} />}
          {stage === 'swipe' && (
            <SwipeMovies
              user1Movies={user1Movies}
              user2Movies={user2Movies}
              onComplete={handleSwipeComplete}
            />
          )}
          {stage === 'suggestion' && (
            <CommonSuggestion movie={commonMovie} onRestart={handleRestart} />
          )}
        </Container>
        <Box textAlign="center" p={2}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Movie Tinder. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default App;
