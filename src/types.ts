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

export interface CartItemInterface extends ProductDocInterface {
  amount: number;
}

export interface UserAuthValuesInterface {
  userId: string;
  email: string;
  displayName: string;
}

export interface UserDetailsInterface extends UserAuthValuesInterface {
  role: string;
  cart: CartItemInterface[];
  docId: string;
}

export interface UserDetailsCartItemInterface {
  amount: number;
  productDocId: string;
}
export interface AllCartInterface {
  displayName: string;
  docId: string;
  email: string;
  role: string;
  userId: string;
  cart: UserDetailsCartItemInterface[];
}
