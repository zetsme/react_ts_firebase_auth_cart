import { UserInfoDocInterface } from '../../types';
import { UserInfoAction, UserInfoEnum } from './userInfoTypes';

export interface UserInfoStateInterface extends UserInfoDocInterface {}

const initialState: UserInfoStateInterface = {
  cart: [],
  role: '',
  userId: '',
  loading: false,
  error: '',
  docId: '',
};

export const userInfoReducer = (
  state = initialState,
  action: UserInfoAction
): UserInfoStateInterface => {
  switch (action.type) {
    case UserInfoEnum.USER_INFO_START:
      return { ...state, loading: true, error: '' };
    case UserInfoEnum.USER_INFO_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserInfoEnum.USER_INFO_GET:
      const { role, userId, cart, docId } = action.payload;
      return { ...state, loading: false, role, userId, cart, docId };
    default:
      return state;
  }
};
