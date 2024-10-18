"use client"

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { DotsThreeVertical as MoreVertIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

const ITEM_HEIGHT = 48;

interface ProductOptionsProps {
  productId: string;
}

export default function ProductOptions({ productId }: ProductOptionsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push(`/dashboard/products/edit/${productId}`);
    handleClose();
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      const res = await axios.delete(`/api/products?id=${productId}`)
      if (res.status === 200) {
        router.refresh();
        Swal.fire({
          title: "success",
          text: "Product deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "error",
          text: "Failed to delete the product!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error('An error occurred while deleting the product:', error);
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
      </Menu>
    </div>
  );
}
