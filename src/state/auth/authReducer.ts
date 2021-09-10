import { User } from '@firebase/auth';
import { AuthAction, AuthEnum } from './authTypes';

export interface AuthStateInterface {
  loading: boolean;
  currentUser: User | null;
  error: string;
}

const initialState = {
  loading: false,
  currentUser: null,
  error: '',
};

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthEnum.AUTH_START:
      return { ...state, loading: true, error: '' };
    case AuthEnum.AUTH_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case AuthEnum.AUTH_LOGOUT:
      return { ...state, loading: false, currentUser: null };
    case AuthEnum.AUTH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
