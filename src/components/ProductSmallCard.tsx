import { useDispatch } from 'react-redux';
import { deleteProduct } from '../state/products/productsActionCreators';
import { ProductDocInterface } from '../types';

interface ProdcutSmallCardProps {
  product: ProductDocInterface;
  editProduct: (docId: string) => void;
}

const ProductSmallCard: React.FC<ProdcutSmallCardProps> = ({ product, editProduct }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h4>{product.title}</h4>
      <img width='100' height='100' src={product.image} alt={product.title} />
      <p>Category: {product.category}</p>
      <p>Description : {product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => editProduct(product.docId)}>Update</button>
      <button onClick={() => dispatch(deleteProduct(product.docId))}>Delete</button>
    </div>
  );
};

export default ProductSmallCard;
