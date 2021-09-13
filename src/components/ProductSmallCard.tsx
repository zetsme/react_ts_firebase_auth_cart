import { useDispatch } from 'react-redux';
import { productsActionCreators } from '../state';
import { ProductDocInterface } from '../types';

interface ProductSmallCardProps {
  product: ProductDocInterface;
  editProduct: (docId: string) => void;
}

const ProductSmallCard: React.FC<ProductSmallCardProps> = ({ product, editProduct }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h4>{product.title}</h4>
      <img width='100' height='100' src={product.image} alt={product.title} />
      <p>Category: {product.category}</p>
      <p>Description : {product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => editProduct(product.docId)}>Update</button>
      <button onClick={() => dispatch(productsActionCreators.deleteProduct(product.docId))}>
        Delete
      </button>
    </div>
  );
};

export default ProductSmallCard;
