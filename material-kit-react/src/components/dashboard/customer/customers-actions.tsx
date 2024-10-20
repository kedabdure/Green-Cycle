"use client";

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { DotsThreeVertical as MoreVertIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { HandPalm as SuspendIcon } from '@phosphor-icons/react/dist/ssr/HandPalm';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';

const ITEM_HEIGHT = 48;

interface CustomerOptionsProps {
  customerId: string;
}

export default function CustomerOptions({ customerId }: CustomerOptionsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push(`/dashboard/customers/edit/${customerId}`);
    handleClose();
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }
    try {
      const res = await axios.delete(`/api/customers?id=${customerId}`);
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['customers'] });
        Swal.fire({
          title: "Success",
          text: "Customer deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete the customer!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error('An error occurred while deleting the customer:', error);
    }
    handleClose();
  };

  const handleSuspend = async () => {
    if (!window.confirm('Are you sure you want to suspend this customer?')) {
      return;
    }
    try {
      const res = await axios.patch(`/api/customers/suspend?id=${customerId}`);
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['customers'] });
        Swal.fire({
          title: "Success",
          text: "Customer suspended successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to suspend the customer!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error('An error occurred while suspending the customer:', error);
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
        <MenuItem onClick={handleEdit}>
          <PencilIcon size={17} />
          <Typography ml="3px" fontSize=".9rem">
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <TrashIcon size={17} color="red" />
          <Typography ml="3px" fontSize=".9rem" color="red">
            Delete
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleSuspend}>
          <SuspendIcon size={17} color="orange" />
          <Typography ml="3px" fontSize=".9rem" color="orange">
            Suspend
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
