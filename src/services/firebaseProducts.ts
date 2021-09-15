import { addDoc, deleteDoc, doc, getDocs, setDoc } from '@firebase/firestore';
import { ProductDocInterface, ProductInterface } from '../types';
import { productsCollection } from './firebaseDB';

export const addProductFB = async (product: ProductInterface) => {
  const { id } = await addDoc(productsCollection, product);
  return id;
};
export const getAllProductsFB = async (): Promise<ProductDocInterface[]> => {
  const data = await getDocs(productsCollection);
  const products = data.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return products as ProductDocInterface[];
};

export const updateProductFB = async (docId: string, product: ProductInterface) => {
  await setDoc(doc(productsCollection, docId), product);
};
export const deleteProductFB = async (docId: string) => {
  await deleteDoc(doc(productsCollection, docId));
};
