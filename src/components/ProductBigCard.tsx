import { useAppSelector } from '../hooks/useAppSelector';
import { ProductDocInterface } from '../types';
import { userDetailsActionCreators } from '../state';
import { useDispatch } from 'react-redux';

interface ProductBigCardProps {
  product: ProductDocInterface;
}

const ProductBigCard: React.FC<ProductBigCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { userId, role } = useAppSelector((state) => state.userDetails);
  return (
    <div>
      <h4>{product.title}</h4>
      <img
        style={{ objectFit: 'cover' }}
        width='200'
        height='200'
        src={product.image}
        alt={product.title}
      />
      <p>Category: {product.category}</p>
      <p>Description : {product.description}</p>
      <p>Price: ${product.price}</p>
      {userId && role === 'customer' && (
        <button
          onClick={() => dispatch(userDetailsActionCreators.addToCart(product.docId, userId))}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductBigCard;
