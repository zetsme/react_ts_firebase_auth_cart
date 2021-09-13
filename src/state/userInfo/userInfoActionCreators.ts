import { firebaseUserInfoFunctions } from '../../services';
import { AppDispatch } from '../store';
import { UserInfoEnum } from './userInfoTypes';

export const getUserInfo = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: UserInfoEnum.USER_INFO_START });
  try {
    const userInfo = await firebaseUserInfoFunctions.getUserInfo(userId);
    if (userInfo) {
      const { cart, role, userId, docId } = userInfo;
      dispatch({ type: UserInfoEnum.USER_INFO_GET, payload: { cart, role, userId, docId } });
    }
  } catch (error) {
    dispatch({ type: UserInfoEnum.USER_INFO_ERROR, payload: 'Get User Info Error' });
  }
};

export const addToCart =
  (productDocId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: UserInfoEnum.USER_INFO_START });
    try {
      const cart = await firebaseUserInfoFunctions.addToCart(productDocId, userId);
      dispatch({ type: UserInfoEnum.USER_INFO_ADD_TO_CART, payload: cart });
    } catch (error) {
      dispatch({ type: UserInfoEnum.USER_INFO_ERROR, payload: 'Add To cart Error' });
    }
  };

export const clearUserInfo = () => (dispatch: AppDispatch) =>
  dispatch({ type: UserInfoEnum.USER_INFO_CLEAR });

export const addOneToCart =
  (productDocId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: UserInfoEnum.USER_INFO_START });
    try {
      await firebaseUserInfoFunctions.addOneToCart(productDocId, userId);
      dispatch({ type: UserInfoEnum.USER_INFO_ADD_ONE_TO_CART, payload: productDocId });
    } catch (error) {
      dispatch({ type: UserInfoEnum.USER_INFO_ERROR, payload: 'Add One To Cart Error' });
    }
  };

export const removeOneFromCart =
  (productDocId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: UserInfoEnum.USER_INFO_START });
    try {
      await firebaseUserInfoFunctions.removeOneFromCart(productDocId, userId);
      dispatch({ type: UserInfoEnum.USER_INFO_REMOVE_ONE_FROM_CART, payload: productDocId });
    } catch (error) {
      dispatch({ type: UserInfoEnum.USER_INFO_ERROR, payload: 'Remove One From Cart Error' });
    }
  };
