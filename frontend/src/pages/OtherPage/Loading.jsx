import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',   // Center horizontally
        alignItems: 'center',       // Center vertically
        height: '100vh',            // Full viewport height
      }}
    >
      <CircularProgress />
    </Box>
  );
}
