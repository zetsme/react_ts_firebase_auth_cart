import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { RouteTypes } from '../routes';
import { Link as RouterLink } from 'react-router-dom';

interface NavMenuInterface {
  menuTitle: string;
  options: { to: RouteTypes; title: string }[];
}

const NavigationDropdownMenu: React.FC<NavMenuInterface> = ({ menuTitle, options }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        variant='outlined'
        color='inherit'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {menuTitle}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map((item) => (
          <MenuItem key={item.title} component={RouterLink} to={item.to} onClick={handleClose}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavigationDropdownMenu;
