import { CartItemInterface } from '../../types';

export enum UserDetailsEnum {
  USER_DETAILS_START = 'USER_DETAILS_START',
  USER_DETAILS_ERROR = 'USER_DETAILS_ERROR',
  USER_DETAILS_GET = 'USER_DETAILS_GET',
  USER_DETAILS_ADD_TO_CART = 'USER_DETAILS_ADD_TO_CART',
  USER_DETAILS_CLEAR = 'USER_DETAILS_CLEAR',
  USER_DETAILS_ADD_ONE_TO_CART = 'USER_DETAILS_ADD_ONE_TO_CART',
  USER_DETAILS_REMOVE_ONE_FROM_CART = 'USER_DETAILS_REMOVE_ONE_FROM_CART',
}

export interface UserDetailsStartAction {
  type: UserDetailsEnum.USER_DETAILS_START;
}
export interface UserDetailsFailAction {
  type: UserDetailsEnum.USER_DETAILS_ERROR;
  payload: string;
}
export interface UserDetailsGetAction {
  type: UserDetailsEnum.USER_DETAILS_GET;
  payload: { role: string; userId: string; cart: CartItemInterface[]; docId: string };
}
export interface UserDetailsAddToCartAction {
  type: UserDetailsEnum.USER_DETAILS_ADD_TO_CART;
  payload: CartItemInterface[];
}
export interface UserDetailsClearAction {
  type: UserDetailsEnum.USER_DETAILS_CLEAR;
}
export interface UserDetailsAddOneToCartAction {
  type: UserDetailsEnum.USER_DETAILS_ADD_ONE_TO_CART;
  payload: string;
}
export interface UserDetailsRemoveOneFromCartAction {
  type: UserDetailsEnum.USER_DETAILS_REMOVE_ONE_FROM_CART;
  payload: string;
}

export type UserDetailsAction =
  | UserDetailsStartAction
  | UserDetailsFailAction
  | UserDetailsGetAction
  | UserDetailsAddToCartAction
  | UserDetailsClearAction
  | UserDetailsAddOneToCartAction
  | UserDetailsRemoveOneFromCartAction;
