// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import darkTheme from './themes/darkTheme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Resets CSS and applies the theme's background */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
