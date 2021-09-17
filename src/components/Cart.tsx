import { ChevronRight } from '@mui/icons-material';
import { IconButton, styled, Drawer as MuiDrawer, Typography, Divider, Grid } from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector';
import CartProductCard from './CartProductCard';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '.MuiPaper-root': {
    top: `56px`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: `48px`,
    },
    [theme.breakpoints.up('sm')]: {
      top: `64px`,
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

interface CartProps {
  drawerwidth: number;
  open: boolean;
  handleDrawerClose: () => void;
}

const Cart: React.FC<CartProps> = ({ drawerwidth, open, handleDrawerClose }) => {
  const { cart } = useAppSelector((state) => state.userDetails);
  const total = cart.reduce((acc, cur) => (acc += cur.amount * cur.price), 0);
  return (
    <Drawer
      sx={{
        width: 'drawerwidth',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerwidth,
        },
      }}
      variant='persistent'
      anchor='right'
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRight />
        </IconButton>
        <Typography variant='h4'>Total: ${total}</Typography>
      </DrawerHeader>
      <Divider />
      <Grid container gap={2} p={2} pb={12}>
        {!cart.length && <h1>No Items in Cart</h1>}
        {cart.length > 0 &&
          cart.map((cartItem) => (
            <Grid key={cartItem.docId} item xs={12}>
              <CartProductCard {...{ cartItem }} />{' '}
            </Grid>
          ))}
      </Grid>
    </Drawer>
  );
};

export default Cart;
