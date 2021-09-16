export enum RouteNames {
  LOGIN = '/login',
  REGISTER = '/register',
  HOME = '/',
  ADMIN_PRODUCTS = '/admin/products',
  ADMIN_ORDERS = '/admin/orders',
}

export type RouteTypes =
  | RouteNames.LOGIN
  | RouteNames.REGISTER
  | RouteNames.HOME
  | RouteNames.ADMIN_PRODUCTS
  | RouteNames.ADMIN_ORDERS;
