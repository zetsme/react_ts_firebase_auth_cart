import { firebaseApp } from './firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { ProductInterface } from '../types';

const db = getFirestore(firebaseApp);
const productsCollection = collection(db, 'products');

export const addProductFB = async (product: ProductInterface) => {
  const { id } = await addDoc(productsCollection, product);
  return id;
};
export const getAllProductsFB = async (): Promise<ProductInterface[]> => {
  const data = await getDocs(productsCollection);
  const products = data.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  console.log(products);
  return products as ProductInterface[];
};

export const updateProductFB = async (docId: string, product: ProductInterface) => {
  await setDoc(doc(productsCollection, docId), product);
};
export const deleteProductFB = async (docId: string) => {
  await deleteDoc(doc(productsCollection, docId));
};
