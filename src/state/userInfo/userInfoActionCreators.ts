import { firebaseUserDetailsFunctions } from '../../services';
import { AppDispatch } from '../store';
import { UserDetailsEnum } from './userInfoTypes';

export const getUserInfo = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: UserDetailsEnum.USER_DETAILS_START });
  try {
    const userInfo = await firebaseUserDetailsFunctions.getUserInfo(userId);
    if (userInfo) {
      const { cart, role, userId, docId } = userInfo;
      dispatch({ type: UserDetailsEnum.USER_DETAILS_GET, payload: { cart, role, userId, docId } });
    }
  } catch (error) {
    dispatch({ type: UserDetailsEnum.USER_DETAILS_ERROR, payload: 'Get User Info Error' });
  }
};

export const addToCart =
  (productDocId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: UserDetailsEnum.USER_DETAILS_START });
    try {
      const cart = await firebaseUserDetailsFunctions.addToCart(productDocId, userId);
      dispatch({ type: UserDetailsEnum.USER_DETAILS_ADD_TO_CART, payload: cart });
    } catch (error) {
      dispatch({ type: UserDetailsEnum.USER_DETAILS_ERROR, payload: 'Add To cart Error' });
    }
  };

export const clearUserInfo = () => (dispatch: AppDispatch) =>
  dispatch({ type: UserDetailsEnum.USER_DETAILS_CLEAR });

export const addOneToCart =
  (productDocId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: UserDetailsEnum.USER_DETAILS_START });
    try {
      await firebaseUserDetailsFunctions.addOneToCart(productDocId, userId);
      dispatch({ type: UserDetailsEnum.USER_DETAILS_ADD_ONE_TO_CART, payload: productDocId });
    } catch (error) {
      dispatch({ type: UserDetailsEnum.USER_DETAILS_ERROR, payload: 'Add One To Cart Error' });
    }
  };

export const removeOneFromCart =
  (productDocId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: UserDetailsEnum.USER_DETAILS_START });
    try {
      await firebaseUserDetailsFunctions.removeOneFromCart(productDocId, userId);
      dispatch({ type: UserDetailsEnum.USER_DETAILS_REMOVE_ONE_FROM_CART, payload: productDocId });
    } catch (error) {
      dispatch({ type: UserDetailsEnum.USER_DETAILS_ERROR, payload: 'Remove One From Cart Error' });
    }
  };
