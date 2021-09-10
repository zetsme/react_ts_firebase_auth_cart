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
  amount: number;
  docId?: string;
}
