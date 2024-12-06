// src/themes/darkTheme.js

import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
    primary: {
      main: '#90caf9', // Light blue
    },
    secondary: {
      main: '#f48fb1', // Pink
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1d1d1d', // Slightly lighter for paper components
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Light gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default darkTheme;
