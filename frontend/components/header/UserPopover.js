import React from 'react';
import {
  Divider,
  Box,
  Typography,
  Popover,
  MenuList,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { Logout, AccountCircle, History } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const UserPopover = ({ anchorEl, user, popOverClose }) => {
  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;
  const router = useRouter();

  const handleSignOut = () => {
    popOverClose(null);
    router.push('/auth/signin');
  };

  const handlePopoverClose = () => {
    popOverClose(null);
  }

  return (
    <Popover
      id={id}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={handlePopoverClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      {/* User Info Section */}
      <Box sx={{ p: '16px 20px' }}>
        <Typography variant="subtitle1">{user?.name || 'Guest'}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.email || 'user@example.com'}
        </Typography>
      </Box>
      <Divider />
      {/* Menu List Section */}
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={Link} href="/account" onClick={popOverClose}>
          <ListItemIcon>
            <History fontSize="medium" />
          </ListItemIcon>
          Order History
        </MenuItem>
        <MenuItem component={Link} href="/account" onClick={popOverClose}>
          <ListItemIcon>
            <AccountCircle fontSize="medium" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default UserPopover;
