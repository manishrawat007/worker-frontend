import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{ position:"absolute",top:"50%",left:"50%" }}>
      <CircularProgress />
    </Box>
  );
}