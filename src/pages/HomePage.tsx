import { useCallback, useEffect, useState } from 'react';
import { styled, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
//
import { productsActionCreators } from '../state';
import HomePageGridContainer from '../components/HomePageGridCardContainer';
import CartButton from '../components/CartButton';
import Cart from '../components/Cart';

const drawerwidth = window.innerWidth < 500 ? window.innerWidth : 400;

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
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { error, loading } = useAppSelector((state) => state.products);
  const { role, userId } = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(productsActionCreators.getAllProducts());
  }, [dispatch]);

  //
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);

  useEffect(() => handleDrawerClose(), [userId, handleDrawerClose]);

  if (error) {
    return <h1>{error}</h1>;
  }
  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <Main open={open}>
        {!userId && !loading && (
          <Typography align='center' variant='h4' mb={4}>
            Login and Add Items to Cart
          </Typography>
        )}
        {userId && role === 'customer' && <CartButton {...{ open, handleDrawerOpen }} />}
        <HomePageGridContainer {...{ open, drawerwidth }} />
      </Main>
      <Cart {...{ drawerwidth, open, handleDrawerClose }} />
    </>
  );
};

export default HomePage;
