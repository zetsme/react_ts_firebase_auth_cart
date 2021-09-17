import { Card, CardContent, CardMedia, Fab, Typography } from '@mui/material';
//
import { useDispatch } from 'react-redux';
import { CartItemInterface } from '../types';
import { useAppSelector } from '../hooks/useAppSelector';
import { userDetailsActionCreators } from '../state';
import { Box, styled } from '@mui/system';
import { Add, Remove } from '@mui/icons-material';

interface CartProductCardProps {
  cartItem: CartItemInterface;
}

const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CartProductCard: React.FC<CartProductCardProps> = ({ cartItem }) => {
  const { userId } = useAppSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 320 }} elevation={6}>
      <CardMedia component='img' sx={{ height: 150 }} src={cartItem.image} alt={cartItem.title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <FlexBetween>
          <Box mb={2}>
            <Typography component='div' variant='h5'>
              {cartItem.title}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' component='div'>
              {cartItem.category}
            </Typography>
          </Box>
          <Typography variant='h6'>${cartItem.price}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Fab
            size='small'
            onClick={() => dispatch(userDetailsActionCreators.addOneToCart(cartItem.docId, userId))}
            color='primary'
          >
            <Add />
          </Fab>
          <Typography variant='h6'>Amount: {cartItem.amount}</Typography>
          <Fab
            size='small'
            onClick={() =>
              dispatch(userDetailsActionCreators.removeOneFromCart(cartItem.docId, userId))
            }
            color='secondary'
          >
            <Remove />
          </Fab>
        </FlexBetween>
      </CardContent>
    </Card>
  );
};

export default CartProductCard;
