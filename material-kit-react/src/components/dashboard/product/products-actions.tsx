import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { DotsThreeVertical as MoreVertIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 48;

export default function ProductOptions() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>
          <PencilIcon size={17} />
          <Typography ml='3px' fontSize='.9rem'>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TrashIcon size={17} color='red'/>
          <Typography ml='3px' fontSize='.9rem' color='red'>Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
