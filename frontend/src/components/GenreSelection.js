// src/components/GenreSelection.js

import React, { useEffect, useState } from 'react';
import { getGenres } from '../services/api';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';

const GenreSelection = ({ onSubmit }) => {
  const [genres, setGenres] = useState([]);
  const [user1Selected, setUser1Selected] = useState([]);
  const [user2Selected, setUser2Selected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenres()
      .then((response) => {
        setGenres(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (event, userSetter, userSelected) => {
    const { value, checked } = event.target;
    const genreId = parseInt(value);
    if (checked) {
      userSetter([...userSelected, genreId]);
    } else {
      userSetter(userSelected.filter((id) => id !== genreId));
    }
  };

  const handleSubmit = () => {
    if (user1Selected.length === 0 || user2Selected.length === 0) {
      alert('Both users must select at least one genre.');
      return;
    }
    onSubmit(user1Selected, user2Selected);
  };

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
        Select Your Favorite Genres
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* User 1 */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            User 1
          </Typography>
          <FormGroup>
            {genres.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    value={genre.id}
                    onChange={(e) =>
                      handleCheckboxChange(e, setUser1Selected, user1Selected)
                    }
                  />
                }
                label={genre.name}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* User 2 */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            User 2
          </Typography>
          <FormGroup>
            {genres.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    value={genre.id}
                    onChange={(e) =>
                      handleCheckboxChange(e, setUser2Selected, user2Selected)
                    }
                  />
                }
                label={genre.name}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Find Movies
        </Button>
      </Box>
    </Box>
  );
};

export default GenreSelection;
