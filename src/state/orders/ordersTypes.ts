import { UserDetailsInterface } from '../../types';

export enum OrdersEnum {
  ORDERS_LOADING = 'ORDERS_LOADING',
  ORDERS_ERROR = 'ORDERS_ERROR',
  ORDERS_GET_ALL = 'ORDERS_GET_ALL',
}

export interface OrdersLoadingAction {
  type: OrdersEnum.ORDERS_LOADING;
}
export interface OrdersErrorAction {
  type: OrdersEnum.ORDERS_ERROR;
  payload: string;
}
export interface OrdersGetAllAction {
  type: OrdersEnum.ORDERS_GET_ALL;
  payload: UserDetailsInterface[];
}
export type OrdersAction = OrdersLoadingAction | OrdersErrorAction | OrdersGetAllAction;
