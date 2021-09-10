import { ProductInterface } from '../../types';

export enum ProductEnum {
  PRODUCT_START = 'PRODUCT_START',
  PRODUCT_ERROR = 'PRODUCT_ERROR',
  PRODUCT_ADD = 'PRODUCT_ADD',
  PRODUCT_DELETE = 'PRODUCT_DELETE',
  PRODUCT_UPDATE = 'PRODUCT_UPDATE',
  PRODUCT_GET_ALL = 'PRODUCT_GET_ALL',
  PRODUCT_GET_ONE = 'PRODUCT_GET_ONE',
}
export interface ProductStartAction {
  type: ProductEnum.PRODUCT_START;
}
export interface ProductFailAction {
  type: ProductEnum.PRODUCT_ERROR;
  payload: string;
}
export interface ProductAddAction {
  type: ProductEnum.PRODUCT_ADD;
  payload: ProductInterface;
}
export interface ProductGetAllAction {
  type: ProductEnum.PRODUCT_GET_ALL;
  payload: ProductInterface[];
}
export interface ProductGetOneAction {
  type: ProductEnum.PRODUCT_GET_ONE;
  payload: ProductInterface;
}
export interface ProductDeleteAction {
  type: ProductEnum.PRODUCT_DELETE;
  payload: string;
}
export interface ProductUpdateAction {
  type: ProductEnum.PRODUCT_UPDATE;
  payload: ProductInterface;
}

export type ProductAction =
  | ProductStartAction
  | ProductFailAction
  | ProductAddAction
  | ProductGetAllAction
  | ProductGetOneAction
  | ProductDeleteAction
  | ProductUpdateAction;
