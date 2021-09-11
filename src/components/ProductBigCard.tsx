import { ProductDocInterface } from '../types';

interface ProductBigCardProps {
  product: ProductDocInterface;
}

const ProductBigCard: React.FC<ProductBigCardProps> = ({ product }) => {
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
    </div>
  );
};

export default ProductBigCard;
