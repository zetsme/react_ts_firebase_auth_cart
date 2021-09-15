import { UserDetailsInterface } from '../../types';
import { OrdersAction, OrdersEnum } from './ordersTypes';

interface OrdersStateInterface {
  orders: UserDetailsInterface[];
  loading: boolean;
  error: string;
}

const initialState: OrdersStateInterface = {
  orders: [],
  loading: false,
  error: '',
};

export const ordersReducer = (state = initialState, action: OrdersAction): OrdersStateInterface => {
  switch (action.type) {
    case OrdersEnum.ORDERS_LOADING:
      return { ...state, loading: true, error: '' };
    case OrdersEnum.ORDERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case OrdersEnum.ORDERS_GET_ALL:
      return { ...state, loading: false, orders: action.payload };
    default:
      return state;
  }
};
