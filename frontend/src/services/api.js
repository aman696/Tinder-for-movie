// src/services/api.js

import axios from 'axios';

const API_BASE = 'http://localhost:8000/api'; // Ensure this matches your backend URL

// Fetch all genres
export const getGenres = () => axios.get(`${API_BASE}/genres/`);

// Fetch movies based on selected genres
export const getMovies = (user1_genres, user2_genres) =>
  axios.post(`${API_BASE}/movies/`, { user1_genres, user2_genres });

// Fetch common movie suggestion
export const getCommonSuggestion = (user1_selection, user2_selection) =>
  axios.post(`${API_BASE}/suggestion/`, { user1_selection, user2_selection });
