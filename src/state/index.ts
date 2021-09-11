import * as authActionCreators from './auth/authActionCreators';
import * as productsActionCreators from './products/productsActionCreators';
import * as userInfoActionCreators from './userInfo/userInfoActionCreators';
export const actionCreators = {
  ...authActionCreators,
  ...productsActionCreators,
  ...userInfoActionCreators,
};
