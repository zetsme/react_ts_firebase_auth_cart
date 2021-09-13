import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ordersActionCreators } from '../state';

const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ordersActionCreators.ordersGetAll());
  }, [dispatch]);
  return <div>Orders Page</div>;
};

export default OrdersPage;
