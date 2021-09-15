import { firebaseApp } from './firebase';
import { getFirestore, collection } from 'firebase/firestore';

const db = getFirestore(firebaseApp);
export const productsCollection = collection(db, 'products');
export const userDetailsCollection = collection(db, 'userDetails');
