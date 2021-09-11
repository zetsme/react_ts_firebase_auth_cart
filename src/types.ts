export interface LoginInterface {
  email: string;
  password: string;
}
export interface RegisterInterface extends LoginInterface {
  displayName: string;
}
export interface ProductInterface {
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
export interface ProductDocInterface extends ProductInterface {
  docId: string;
}
export interface UserInfoDocInterface {
  cart: ProductDocInterface[];
  role: string;
  userId: string;
  loading: boolean;
  error: string;
  docId: string;
}
