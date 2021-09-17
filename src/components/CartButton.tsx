import { ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/system';

const PurpleCartButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  zIndex: 800,
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const CartButton: React.FC<{ open: boolean; handleDrawerOpen: () => void }> = ({
  open,
  handleDrawerOpen,
}) => {
  return (
    <PurpleCartButton
      onClick={handleDrawerOpen}
      sx={{ ...(open && { display: 'none' }) }}
      variant='contained'
      size='large'
      startIcon={<ShoppingCart />}
    >
      Cart
    </PurpleCartButton>
  );
};

export default CartButton;
