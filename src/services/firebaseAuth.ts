import { firebaseApp } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginInterface, RegisterInterface, UserAuthValuesInterface } from '../types';
import { firebaseUserInfoFunctions } from './index';

export const auth = getAuth(firebaseApp);

export const registerUser = async ({ email, password, displayName }: RegisterInterface) => {
  await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName });
    await firebaseUserInfoFunctions.addUsersInfo({
      userId: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
    } as UserAuthValuesInterface);
  }
  return auth.currentUser;
};

export const logInUser = async ({ email, password }: LoginInterface) => {
  await signInWithEmailAndPassword(auth, email, password);
  return auth.currentUser;
};

export const signOutUser = async () => {
  await signOut(auth);
};
