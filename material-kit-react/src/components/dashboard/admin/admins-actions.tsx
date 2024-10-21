"use client";

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Pulse } from '@phosphor-icons/react/dist/ssr/Pulse';
import { DotsThreeVertical as MoreVertIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { HandPalm as SuspendIcon } from '@phosphor-icons/react/dist/ssr/HandPalm';
import { Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/use-user';

const ITEM_HEIGHT = 48;

interface AdminsOptionsProps {
  adminId: string;
}

const fetchSuperAdmin = async (adminEmail: string) => {
  const { data } = await axios.get(`/api/admins?email=${adminEmail}`);
  return data;
}

export default function AdminOptions({ adminId }: AdminsOptionsProps) {
  const { user } = useUser();
  const adminEmail = user?.email;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const queryClient = useQueryClient();


  const { data: admin = [] } = useQuery({
    queryKey: ['admins', adminEmail],
    queryFn: () => {
      if (!adminEmail) {
        return Promise.reject('Admin email is undefined');
      }
      return fetchSuperAdmin(adminEmail);
    },
    enabled: !!adminEmail,
  })

  console.log(admin.role)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (admin.role !== 'superadmin') {
      Swal.fire({
        title: "Unauthorized!",
        text: "This action is allowed for Super Admins only!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }
    try {
      const res = await axios.delete(`/api/admins?id=${adminId}`);
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['admin'] });
        Swal.fire({
          title: "Success",
          text: "Customer deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete the admin!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error('An error occurred while deleting the admin:', error);
    }
    handleClose();
  };

  const handleStatusChange = async (status: string) => {
    if (admin.role !== 'super_admin') {
      Swal.fire({
        title: "Unauthorized!",
        text: "This action is allowed for Super Admins only!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!window.confirm(`Are you sure you want to ${status} this admin?`)) {
      return;
    }
    try {
      const res = await axios.put(`/api/admins?id=${adminId}`, { status: `${status}` });
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['admins'] });
        Swal.fire({
          title: "Success",
          text: `Admin ${status == 'suspended' ? 'suspended' : 'activated'} successfully!`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to suspend the admin!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error('An error occurred while suspending the admin:', error);
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
        <MenuItem onClick={() => handleStatusChange("active")}>
          <Pulse size={17} color="green" />
          <Typography ml="3px" fontSize=".9rem" color="green">
            Activate
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("suspended")}>
          <SuspendIcon size={17} color="orange" />
          <Typography ml="3px" fontSize=".9rem" color="orange">
            Suspend
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
