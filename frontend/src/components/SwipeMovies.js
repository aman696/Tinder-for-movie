// src/components/SwipeMovies.js

import React, { useState } from 'react';
import { Box, Button, Grid, Typography, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';

const SwipeMovies = ({ user1Movies, user2Movies, onComplete }) => {
  const [user1Index, setUser1Index] = useState(0);
  const [user2Index, setUser2Index] = useState(0);
  const [user1Selections, setUser1Selections] = useState([]);
  const [user2Selections, setUser2Selections] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSwipe = (user, movieId) => {
    if (user === 1) {
      setUser1Selections([...user1Selections, movieId]);
      setUser1Index(user1Index + 1);
    } else if (user === 2) {
      setUser2Selections([...user2Selections, movieId]);
      setUser2Index(user2Index + 1);
    }
  };

  const checkCompletion = () => {
    if (
      user1Index >= user1Movies.length &&
      user2Index >= user2Movies.length
    ) {
      setLoading(true);
      onComplete(user1Selections, user2Selections);
    }
  };

  // Use useEffect to check completion after state updates
  React.useEffect(() => {
    checkCompletion();
  }, [user1Index, user2Index]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Swipe Through Movies
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* User 1 */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            User 1
          </Typography>
          {user1Index < user1Movies.length ? (
            <MovieCard
              movie={user1Movies[user1Index]}
              onSwipe={(id) => handleSwipe(1, id)}
            />
          ) : (
            <Typography variant="body1" align="center">
              No more movies to swipe.
            </Typography>
          )}
        </Grid>

        {/* User 2 */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            User 2
          </Typography>
          {user2Index < user2Movies.length ? (
            <MovieCard
              movie={user2Movies[user2Index]}
              onSwipe={(id) => handleSwipe(2, id)}
            />
          ) : (
            <Typography variant="body1" align="center">
              No more movies to swipe.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SwipeMovies;
