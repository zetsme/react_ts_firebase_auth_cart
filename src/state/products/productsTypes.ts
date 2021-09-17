import { ProductDocInterface, ProductInterface } from '../../types';

export enum ProductEnum {
  PRODUCT_START = 'PRODUCT_START',
  PRODUCT_ERROR = 'PRODUCT_ERROR',
  PRODUCT_ADD = 'PRODUCT_ADD',
  PRODUCT_DELETE = 'PRODUCT_DELETE',
  PRODUCT_UPDATE = 'PRODUCT_UPDATE',
  PRODUCT_GET_ALL = 'PRODUCT_GET_ALL',
  PRODUCT_GET_ONE = 'PRODUCT_GET_ONE',
  PRODUCT_CLEAR = 'PRODUCT_CLEAR',
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
  payload: ProductDocInterface;
}
export interface ProductGetAllAction {
  type: ProductEnum.PRODUCT_GET_ALL;
  payload: ProductDocInterface[];
}
export interface ProductGetOneAction {
  type: ProductEnum.PRODUCT_GET_ONE;
  payload: ProductDocInterface;
}
export interface ProductDeleteAction {
  type: ProductEnum.PRODUCT_DELETE;
  payload: string;
}
export interface ProductUpdateAction {
  type: ProductEnum.PRODUCT_UPDATE;
  payload: { product: ProductInterface; docId: string };
}
export interface ProductClearAction {
  type: ProductEnum.PRODUCT_CLEAR;
}

export type ProductAction =
  | ProductStartAction
  | ProductFailAction
  | ProductAddAction
  | ProductGetAllAction
  | ProductGetOneAction
  | ProductDeleteAction
  | ProductUpdateAction
  | ProductClearAction;
