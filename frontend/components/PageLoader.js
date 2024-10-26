import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const PageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      background: 'rgba(0, 0, 0, 0.9)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
    }}
  >
    <CircularProgress size={70} thickness={4} sx={{ color: 'white'}}/>
  </Box>
);

export default PageLoader;
