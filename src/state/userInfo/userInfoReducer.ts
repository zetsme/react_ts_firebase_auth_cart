import { CartItemInterface } from '../../types';
import { UserDetailsAction, UserDetailsEnum } from './userInfoTypes';

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

export const userDetailsReducer = (
  state = initialState,
  action: UserDetailsAction
): UserInfoStateInterface => {
  switch (action.type) {
    case UserDetailsEnum.USER_DETAILS_START:
      return { ...state, loading: true, error: '' };
    case UserDetailsEnum.USER_DETAILS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserDetailsEnum.USER_DETAILS_GET:
      const { role, userId, cart, docId } = action.payload;
      return { ...state, loading: false, role, userId, cart, docId };
    case UserDetailsEnum.USER_DETAILS_ADD_TO_CART:
      return { ...state, loading: false, cart: [...action.payload] };
    case UserDetailsEnum.USER_DETAILS_CLEAR:
      return { ...state, cart: [], role: '', userId: '', docId: '' };
    case UserDetailsEnum.USER_DETAILS_ADD_ONE_TO_CART:
      return {
        ...state,
        loading: false,
        cart: state.cart.map((item) =>
          item.docId === action.payload ? { ...item, amount: item.amount + 1 } : item
        ),
      };

    case UserDetailsEnum.USER_DETAILS_REMOVE_ONE_FROM_CART:
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
