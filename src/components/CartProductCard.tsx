import { useDispatch } from 'react-redux';
import { CartItemInterface } from '../types';
import { useAppSelector } from '../hooks/useAppSelector';
import { userInfoActionCreators } from '../state';

interface CartProductCardProps {
  cartItem: CartItemInterface;
}

const CartProductCard: React.FC<CartProductCardProps> = ({ cartItem }) => {
  const { userId } = useAppSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  return (
    <div>
      <h4>{cartItem.title}</h4>
      <img width='100' height='100' src={cartItem.image} alt={cartItem.title} />
      <p>Category: {cartItem.category}</p>
      <p>Description : {cartItem.description}</p>
      <p>Price: ${cartItem.price}</p>
      <button onClick={() => dispatch(userInfoActionCreators.addOneToCart(cartItem.docId, userId))}>
        Add
      </button>
      <p>Amount: {cartItem.amount}</p>
      <button
        onClick={() => dispatch(userInfoActionCreators.removeOneFromCart(cartItem.docId, userId))}
      >
        Remove
      </button>
    </div>
  );
};

export default CartProductCard;
