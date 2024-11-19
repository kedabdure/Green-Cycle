import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from 'phosphor-react';
import { Box } from '@mui/material';

export default function ProductsFilters({ onSearch }) {
  const handleProductSearch = (event) => {
    onSearch(event.target.value);
  }

  return (
    <Box
      elevation={0}
      sx={{
        width: '100%',
        p: 2,
        borderRadius: '12px',
      }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        size='medium'
        placeholder="Search Orders"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon size={24} />
          </InputAdornment>
        }
        onChange={handleProductSearch}
        sx={{ maxWidth: '500px', borderRadius: '12px' }}
      />
    </Box>
  );
}
