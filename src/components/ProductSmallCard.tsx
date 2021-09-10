import { useDispatch } from 'react-redux';
import { deleteProduct } from '../state/products/productsActionCreators';
import { ProductInterface } from '../types';

interface ProdcutSmallCardProps {
  product: ProductInterface;
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
      <p>
        Price: ${product.price} , Amount: {product.amount}
      </p>
      <button onClick={() => product.docId && editProduct(product.docId)}>Update</button>
      <button onClick={() => product.docId && dispatch(deleteProduct(product.docId))}>
        Delete
      </button>
    </div>
  );
};

export default ProductSmallCard;
