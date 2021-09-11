import { getUserInfoFB } from '../../services/firebaseUserInfo';
import { AppDispatch } from '../store';
import { UserInfoEnum } from './userInfoTypes';

export const getUserInfo = (authUserId: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: UserInfoEnum.USER_INFO_START });
  try {
    const userInfo = await getUserInfoFB(authUserId);
    if (userInfo) {
      const { cart, role, userId, docId } = userInfo;
      dispatch({ type: UserInfoEnum.USER_INFO_GET, payload: { cart, role, userId, docId } });
    }
  } catch (error) {
    dispatch({ type: UserInfoEnum.USER_INFO_ERROR, payload: 'Get User Info Error' });
  }
};
