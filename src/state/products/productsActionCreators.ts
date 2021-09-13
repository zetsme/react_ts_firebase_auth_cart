import { ProductInterface } from '../../types';
import { AppDispatch, RootState } from '../store';
import { firebaseProdcutsFunctions } from '../../services';
import { ProductEnum } from './productsTypes';

export const addProduct = (product: ProductInterface) => async (dispatch: AppDispatch) => {
  dispatch({ type: ProductEnum.PRODUCT_START });
  try {
    const docId = await firebaseProdcutsFunctions.addProductFB(product);
    dispatch({ type: ProductEnum.PRODUCT_ADD, payload: { ...product, docId } });
  } catch (error) {
    dispatch({ type: ProductEnum.PRODUCT_ERROR, payload: 'Product Add Error' });
  }
};

export const getAllProducts = () => async (dispatch: AppDispatch) => {
  dispatch({ type: ProductEnum.PRODUCT_START });
  try {
    const products = await firebaseProdcutsFunctions.getAllProductsFB();
    dispatch({ type: ProductEnum.PRODUCT_GET_ALL, payload: products });
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
      await firebaseProdcutsFunctions.updateProductFB(docId, product);
      dispatch({ type: ProductEnum.PRODUCT_UPDATE, payload: { product, docId } });
    } catch (error) {
      dispatch({ type: ProductEnum.PRODUCT_ERROR, payload: 'Product Update Error' });
    }
  };
export const deleteProduct = (docId: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: ProductEnum.PRODUCT_START });
  try {
    await firebaseProdcutsFunctions.deleteProductFB(docId);
    dispatch({ type: ProductEnum.PRODUCT_DELETE, payload: docId });
  } catch (error) {
    dispatch({ type: ProductEnum.PRODUCT_ERROR, payload: 'Product Delete Error' });
  }
};
