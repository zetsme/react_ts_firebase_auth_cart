import { addDoc, collection, getDocs } from '@firebase/firestore';
import { UserInfoDocInterface } from '../types';
import { db } from './firebaseDB';

const usersCollection = collection(db, 'usersInfo');

export const addUsersInfo = async (userId: string) => {
  await addDoc(usersCollection, { role: 'customer', cart: [], userId });
};
export const getUserInfoFB = async (userId: string): Promise<UserInfoDocInterface | undefined> => {
  const data = await getDocs(usersCollection);
  const result = data.docs.find((item) => item.data().userId === userId);
  if (result) {
    return { ...result.data(), docId: result.id } as UserInfoDocInterface;
  }
};
