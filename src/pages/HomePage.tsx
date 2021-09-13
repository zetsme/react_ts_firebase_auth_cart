import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CartProductCard from '../components/CartProductCard';
import ProductBigCard from '../components/ProductBigCard';
import { useAppSelector } from '../hooks/useAppSelector';
import { productsActionCreators } from '../state';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useAppSelector((state) => state.products);
  const { cart } = useAppSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(productsActionCreators.getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading ....</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div style={{ display: 'flex' }}>
      <div>
        {products.map((product) => (
          <ProductBigCard key={product.docId} {...{ product }} />
        ))}
      </div>
      <div>
        {cart.length > 0 &&
          cart.map((cartItem) => <CartProductCard key={cartItem.docId} {...{ cartItem }} />)}
      </div>
    </div>
  );
};

export default HomePage;
