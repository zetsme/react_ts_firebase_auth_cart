import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductBigCard from '../components/ProductBigCard';
import { useAppSelector } from '../hooks/useAppSelector';
import { actionCreators } from '../state';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(actionCreators.getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading ....</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div>
      <div>
        {products.map((product) => (
          <ProductBigCard key={product.docId} {...{ product }} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
