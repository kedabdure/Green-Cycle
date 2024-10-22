"use client";

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { DotsThreeVertical as MoreVertIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';

const ITEM_HEIGHT = 48;

interface OrderOptionsProps {
  orderId: string;
  currentStatus: string;
}

export default function OrderActions({ orderId, currentStatus }: OrderOptionsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }
    try {
      const res = await axios.delete(`/api/orders?id=${orderId}`);
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        Swal.fire({
          title: 'Success',
          text: 'Order deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete the order!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('An error occurred while deleting the order:', error);
    }
    handleClose();
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!window.confirm(`Are you sure you want to change the order status to ${newStatus}?`)) {
      return;
    }
    try {
      const res = await axios.put(`/api/orders?id=${orderId}`, { status: newStatus });
      if (res.status === 200) {
        // Invalidate the orders query to refetch updated data
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        Swal.fire({
          title: 'Success',
          text: `Order status changed to ${newStatus}!`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to change order status!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('An error occurred while changing the order status:', error);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => handleStatusChange('Pending')}>
          <Typography ml="3px" fontSize=".9rem">
            Pending
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('Shipped')}>
          <Typography ml="3px" fontSize=".9rem">
            Shipped
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('On the Way')}>
          <Typography ml="3px" fontSize=".9rem">
            On the Way
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('Delivered')}>
          <Typography ml="3px" fontSize=".9rem">
            Delivered
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <TrashIcon size={17} color="red" />
          <Typography ml="3px" fontSize=".9rem" color="red">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
