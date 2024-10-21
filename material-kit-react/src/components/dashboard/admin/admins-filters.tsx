import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface AdminSearchProps {
  onSearch: (query: string) => void;
}

export function AdminsFilters({ onSearch }: AdminSearchProps): React.JSX.Element {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  }

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search customer"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        onChange={handleSearchChange}
        sx={{ maxWidth: '500px' }}
      />
    </Card>
  );
}
