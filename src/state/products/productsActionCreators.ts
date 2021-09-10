import { ProductInterface } from '../../types';
import { AppDispatch, RootState } from '../store';
import {
  addProductFB,
  deleteProductFB,
  getAllProductsFB,
  updateProductFB,
} from '../../services/firebaseDB';
import { ProductEnum } from './productsTypes';

export const addProduct = (product: ProductInterface) => async (dispatch: AppDispatch) => {
  dispatch({ type: ProductEnum.PRODUCT_START });
  try {
    const docId = await addProductFB(product);
    dispatch({ type: ProductEnum.PRODUCT_ADD, payload: { ...product, docId } });
  } catch (error) {
    dispatch({ type: ProductEnum.PRODUCT_ERROR, payload: 'Product Add Error' });
  }
};

export const getAllProducts = () => async (dispatch: AppDispatch) => {
  dispatch({ type: ProductEnum.PRODUCT_START });
  const products = await getAllProductsFB();
  dispatch({ type: ProductEnum.PRODUCT_GET_ALL, payload: products });
  try {
  } catch (error) {
    dispatch({ type: ProductEnum.PRODUCT_ERROR, payload: 'Product Get All Error' });
  }
};
export const getOneProduct =
  (docId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const product = state.products.products.find((i) => i.docId === docId);
    product && dispatch({ type: ProductEnum.PRODUCT_GET_ONE, payload: product });
  };
export const updateProduct =
  (docId: string, product: ProductInterface) => async (dispatch: AppDispatch) => {
    dispatch({ type: ProductEnum.PRODUCT_START });
    try {
      await updateProductFB(docId, product);
      dispatch({ type: ProductEnum.PRODUCT_UPDATE, payload: product });
    } catch (error) {
      dispatch({ type: ProductEnum.PRODUCT_ERROR, payload: 'Product Update Error' });
    }
  };
export const deleteProduct = (docId: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: ProductEnum.PRODUCT_START });
  try {
    await deleteProductFB(docId);
    dispatch({ type: ProductEnum.PRODUCT_DELETE, payload: docId });
  } catch (error) {
    dispatch({ type: ProductEnum.PRODUCT_ERROR, payload: 'Product Delete Error' });
  }
};
