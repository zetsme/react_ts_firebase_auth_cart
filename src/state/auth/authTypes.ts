import { User } from '@firebase/auth';

export enum AuthEnum {
  AUTH_START = 'AUTH_START',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAIL = 'AUTH_FAIL',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export interface AuthStartAction {
  type: AuthEnum.AUTH_START;
}
export interface AuthSuccesAction {
  type: AuthEnum.AUTH_SUCCESS;
  payload: User | null;
}
export interface AuthFailAction {
  type: AuthEnum.AUTH_FAIL;
  payload: string;
}
export interface AuthLogoutAction {
  type: AuthEnum.AUTH_LOGOUT;
}
export type AuthAction = AuthStartAction | AuthSuccesAction | AuthFailAction | AuthLogoutAction;
