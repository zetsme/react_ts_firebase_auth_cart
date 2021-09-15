import { firebaseUserDetailsFunctions } from '../../services';
import { AppDispatch } from '../store';
import { OrdersEnum } from './ordersTypes';

export const ordersGetAll = () => async (dispatch: AppDispatch) => {
  dispatch({ type: OrdersEnum.ORDERS_LOADING });
  try {
    const payload = await firebaseUserDetailsFunctions.getAllCarts();
    dispatch({ type: OrdersEnum.ORDERS_GET_ALL, payload });
  } catch (error) {
    dispatch({ type: OrdersEnum.ORDERS_ERROR, payload: 'Orders Get All Error' });
  }
};
