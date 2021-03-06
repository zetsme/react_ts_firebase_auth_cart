import { Button, CardActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { userDetailsActionCreators } from '../state';
import { ProductDocInterface } from '../types';
import ProductBigCard from './ProductBigCard';

const HomePageProductCard: React.FC<{ product: ProductDocInterface }> = ({ product }) => {
  const dispatch = useDispatch();
  const { userId, role, loading } = useAppSelector((state) => state.userDetails);
  return (
    <ProductBigCard {...{ product }}>
      {loading && (
        <LoadingButton variant='outlined' loading>
          Loading
        </LoadingButton>
      )}
      {!loading && userId && role === 'customer' && (
        <CardActions>
          <Button
            variant='contained'
            onClick={() => dispatch(userDetailsActionCreators.addToCart(product.docId, userId))}
          >
            Add to Cart
          </Button>
        </CardActions>
      )}
    </ProductBigCard>
  );
};

export default HomePageProductCard;
