import { addDoc, collection, getDocs, doc, updateDoc } from '@firebase/firestore';
import {
  CartItemInterface,
  ProductDocInterface,
  UserAuthValuesInterface,
  UserInfoInterface,
} from '../types';
import { productsCollection } from './firebaseProducts';
import { db } from './firebaseDB';

const usersCollection = collection(db, 'usersInfo');

export const addUsersInfo = async ({ userId, email, displayName }: UserAuthValuesInterface) => {
  await addDoc(usersCollection, { role: 'customer', cart: [], userId, email, displayName });
};
export const getUserInfo = async (userId: string): Promise<UserInfoInterface> => {
  const data = await getDocs(usersCollection);
  const currentUser = data.docs.find((item) => item.data().userId === userId);
  const cart: usersInfoCartItemInterface[] = currentUser?.data().cart;
  const products = (await getDocs(productsCollection)).docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  const cartWithProducts: CartItemInterface[] = cart.map((item) => {
    const product = products.find((i) => i.docId === item.productDocId);
    return { ...product, amount: item.amount } as CartItemInterface;
  });
  return {
    ...currentUser?.data(),
    cart: cartWithProducts,
    docId: currentUser?.id,
  } as UserInfoInterface;
};

export interface usersInfoCartItemInterface {
  amount: number;
  productDocId: string;
}

export const addToCart = async (
  productDocId: string,
  userId: string
): Promise<CartItemInterface[]> => {
  const data = await getDocs(usersCollection);
  const currentUser = data.docs.find((item) => item.data().userId === userId);
  const cart: usersInfoCartItemInterface[] = currentUser?.data().cart;
  const isItemInCard = cart.find((item) => item.productDocId === productDocId);
  const result = (): usersInfoCartItemInterface[] => {
    if (isItemInCard) {
      return cart.map((item: any) =>
        item.productDocId === productDocId ? { ...item, amount: item.amount + 1 } : item
      );
    }
    return [...cart, { productDocId, amount: 1 }];
  };
  const currentUserRef = doc(usersCollection, currentUser?.id);
  await updateDoc(currentUserRef, {
    cart: result(),
  });
  const products = (await getDocs(productsCollection)).docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  const cartItems: CartItemInterface[] = result().map((item) => {
    const product = products.find((i) => i.docId === item.productDocId);
    return { ...product, amount: item.amount } as CartItemInterface;
  });
  return cartItems;
};

export const addOneToCart = async (productDocId: string, userId: string) => {
  const data = await getDocs(usersCollection);
  const currentUser = data.docs.find((item) => item.data().userId === userId);
  const cart: usersInfoCartItemInterface[] = currentUser?.data().cart;
  const result = (): usersInfoCartItemInterface[] =>
    cart.map((item: any) =>
      item.productDocId === productDocId ? { ...item, amount: item.amount + 1 } : item
    );
  const currentUserRef = doc(usersCollection, currentUser?.id);
  await updateDoc(currentUserRef, {
    cart: result(),
  });
};

export const removeOneFromCart = async (productDocId: string, userId: string) => {
  const data = await getDocs(usersCollection);
  const currentUser = data.docs.find((item) => item.data().userId === userId);
  const cart: usersInfoCartItemInterface[] = currentUser?.data().cart;
  const result = () =>
    cart.reduce((acc, cur) => {
      if (cur.productDocId === productDocId) {
        if (cur.amount === 1) return acc;
        return [...acc, { ...cur, amount: cur.amount - 1 }];
      } else {
        return [...acc, cur];
      }
    }, [] as usersInfoCartItemInterface[]);
  const currentUserRef = doc(usersCollection, currentUser?.id);
  await updateDoc(currentUserRef, {
    cart: result(),
  });
};

interface AllCartInterface {
  displayName: string;
  docId: string;
  email: string;
  role: string;
  userId: string;
  cart: usersInfoCartItemInterface[];
}

export const getAllCarts = async (): Promise<UserInfoInterface[]> => {
  let usersInfo = (await getDocs(usersCollection)).docs.map(
    (item) =>
      ({
        ...item.data(),
        docId: item.id,
      } as AllCartInterface)
  );
  const products = (await getDocs(productsCollection)).docs.map(
    (item) =>
      ({
        ...item.data(),
        docId: item.id,
      } as ProductDocInterface)
  );
  usersInfo = usersInfo
    .filter((item) => item.role !== 'admin')
    .filter((item) => item.cart.length !== 0);
  const temp = usersInfo.map((item) => {
    const result: CartItemInterface[] = item.cart.map((i) => {
      const product = products.find((k) => k.docId === i.productDocId);
      return { ...product, amount: i.amount } as CartItemInterface;
    });
    return { ...item, cart: result };
  });

  return temp as UserInfoInterface[];
};
