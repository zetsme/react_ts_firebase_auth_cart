import { useEffect, useState } from 'react';
import { ChevronRight, ShoppingCart } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  Drawer as MuiDrawer,
  Grid,
  GridProps,
  styled,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
//
import CartProductCard from '../components/CartProductCard';
import ProductBigCard from '../components/ProductBigCard';
import { productsActionCreators } from '../state';

const drawerWidth = window.innerWidth < 500 ? window.innerWidth : 500;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
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

const CartButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  zIndex: 800,
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

interface GridContainerProps extends GridProps {
  open?: boolean;
}

const GridContainer = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'open',
})<GridContainerProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
  // justifyContent: 'center',
}));

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { error, products } = useAppSelector((state) => state.products);
  const { cart, role, userId } = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(productsActionCreators.getAllProducts());
  }, [dispatch]);

  //
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Main open={open}>
        {userId && role === 'customer' && (
          <CartButton
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
            variant='contained'
            size='large'
            startIcon={<ShoppingCart />}
          >
            Cart
          </CartButton>
        )}
        <GridContainer spacing={4} open={open} container>
          {products.map((product) => (
            <Grid item xs='auto' key={product.docId}>
              <ProductBigCard {...{ product }} />
            </Grid>
          ))}
        </GridContainer>
      </Main>
      <Drawer
        sx={{
          width: 'drawerWidth',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
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
        </DrawerHeader>
        <Divider />
        <Grid container>
          {cart.length > 0 &&
            cart.map((cartItem) => <CartProductCard key={cartItem.docId} {...{ cartItem }} />)}
        </Grid>
      </Drawer>
    </>
  );
};

export default HomePage;
