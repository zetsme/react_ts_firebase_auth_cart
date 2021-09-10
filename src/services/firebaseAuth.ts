import { firebaseApp } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginInterface, RegisterInterface } from '../types';

export const auth = getAuth(firebaseApp);

export const registerUser = async ({ email, password, displayName }: RegisterInterface) => {
  await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName });
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
