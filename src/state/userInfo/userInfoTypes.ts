import { ProductDocInterface } from '../../types';

export enum UserInfoEnum {
  USER_INFO_START = 'USER_INFO_START',
  USER_INFO_ERROR = 'USER_INFO_ERROR',
  USER_INFO_GET = 'USER_INFO_GET',
}

export interface UserInfoStartAction {
  type: UserInfoEnum.USER_INFO_START;
}
export interface UserInfoFailAction {
  type: UserInfoEnum.USER_INFO_ERROR;
  payload: string;
}
export interface UserInfoGetAction {
  type: UserInfoEnum.USER_INFO_GET;
  payload: { role: string; userId: string; cart: ProductDocInterface[]; docId: string };
}

export type UserInfoAction = UserInfoStartAction | UserInfoFailAction | UserInfoGetAction;
