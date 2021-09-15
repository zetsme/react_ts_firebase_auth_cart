import { User } from '@firebase/auth';
import { firebaseAuthFunctions, firebaseUserDetailsFunctions } from '../../services';
import { LoginInterface, RegisterInterface } from '../../types';
import { AppDispatch } from '../store';
import { UserDetailsEnum } from '../userInfo/userInfoTypes';
import { AuthEnum } from './authTypes';

export const register =
  ({ email, password, displayName }: RegisterInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: AuthEnum.AUTH_START });
    try {
      const user = await firebaseAuthFunctions.registerUser({ email, password, displayName });
      if (user) {
        dispatch({ type: AuthEnum.AUTH_SUCCESS, payload: user });
        const userInfo = await firebaseUserDetailsFunctions.getUserInfo(user.uid);
        const { cart, role, userId, docId } = userInfo;
        dispatch({
          type: UserDetailsEnum.USER_DETAILS_GET,
          payload: { cart, role, userId, docId },
        });
      }
    } catch (error) {
      dispatch({ type: AuthEnum.AUTH_FAIL, payload: 'Register Error' });
    }
  };

export const login =
  ({ email, password }: LoginInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: AuthEnum.AUTH_START });
    try {
      const user = await firebaseAuthFunctions.logInUser({ email, password });
      dispatch({ type: AuthEnum.AUTH_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: AuthEnum.AUTH_FAIL, payload: 'Login Error' });
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch({ type: AuthEnum.AUTH_START });
  try {
    await firebaseAuthFunctions.signOutUser();
    dispatch({ type: AuthEnum.AUTH_LOGOUT });
  } catch (error) {
    dispatch({ type: AuthEnum.AUTH_FAIL, payload: 'Logout Error' });
  }
};

export const setUser = (user: User | null) => (dispatch: AppDispatch) => {
  dispatch({ type: AuthEnum.AUTH_SUCCESS, payload: user });
};
