import { CartItemInterface } from '../../types';

export enum UserInfoEnum {
  USER_INFO_START = 'USER_INFO_START',
  USER_INFO_ERROR = 'USER_INFO_ERROR',
  USER_INFO_GET = 'USER_INFO_GET',
  USER_INFO_ADD_TO_CART = 'USER_INFO_ADD_TO_CART',
  USER_INFO_CLEAR = 'USER_INFO_CLEAR',
  USER_INFO_ADD_ONE_TO_CART = 'USER_INFO_ADD_ONE_TO_CART',
  USER_INFO_REMOVE_ONE_FROM_CART = 'USER_INFO_REMOVE_ONE_FROM_CART',
}

export interface UserInfoStartAction {
  type: UserInfoEnum.USER_INFO_START;
}
export interface UserInfoFailAction {
  type: UserInfoEnum.USER_INFO_ERROR;
  payload: string;
}
export interface UserInfoGetAction {
  type: UserInfoEnum.USER_INFO_GET;
  payload: { role: string; userId: string; cart: CartItemInterface[]; docId: string };
}
export interface UserInfoAddToCartAction {
  type: UserInfoEnum.USER_INFO_ADD_TO_CART;
  payload: CartItemInterface[];
}
export interface UserInfoClearAction {
  type: UserInfoEnum.USER_INFO_CLEAR;
}
export interface UserInfoAddOneToCartAction {
  type: UserInfoEnum.USER_INFO_ADD_ONE_TO_CART;
  payload: string;
}
export interface UserInfoRemoveOneFromCartAction {
  type: UserInfoEnum.USER_INFO_REMOVE_ONE_FROM_CART;
  payload: string;
}

export type UserInfoAction =
  | UserInfoStartAction
  | UserInfoFailAction
  | UserInfoGetAction
  | UserInfoAddToCartAction
  | UserInfoClearAction
  | UserInfoAddOneToCartAction
  | UserInfoRemoveOneFromCartAction;
