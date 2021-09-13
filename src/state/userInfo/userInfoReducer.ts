import { CartItemInterface } from '../../types';
import { UserInfoAction, UserInfoEnum } from './userInfoTypes';

export interface UserInfoStateInterface {
  cart: CartItemInterface[];
  role: string;
  userId: string;
  loading: boolean;
  error: string;
  docId: string;
}

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
    case UserInfoEnum.USER_INFO_ADD_TO_CART:
      return { ...state, loading: false, cart: [...action.payload] };
    case UserInfoEnum.USER_INFO_CLEAR:
      return { ...state, cart: [], role: '', userId: '', docId: '' };
    case UserInfoEnum.USER_INFO_ADD_ONE_TO_CART:
      return {
        ...state,
        loading: false,
        cart: state.cart.map((item) =>
          item.docId === action.payload ? { ...item, amount: item.amount + 1 } : item
        ),
      };

    case UserInfoEnum.USER_INFO_REMOVE_ONE_FROM_CART:
      return {
        ...state,
        loading: false,
        cart: state.cart.reduce((acc, cur) => {
          if (cur.docId === action.payload) {
            if (cur.amount === 1) return acc;
            return [...acc, { ...cur, amount: cur.amount - 1 }];
          } else {
            return [...acc, cur];
          }
        }, [] as CartItemInterface[]),
      };

    default:
      return state;
  }
};
