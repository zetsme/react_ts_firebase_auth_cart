import { firebaseApp } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginInterface, RegisterInterface } from '../types';
import { firebaseUserInfoFunctions } from './index';

export const auth = getAuth(firebaseApp);

export const registerUser = async ({ email, password, displayName }: RegisterInterface) => {
  await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName });
    await firebaseUserInfoFunctions.addUsersInfo(auth.currentUser.uid);
  }
  return auth.currentUser;
};

export const logInUser = async ({ email, password }: LoginInterface) => {
  await signInWithEmailAndPassword(auth, email, password);
  console.log(auth.currentUser);
  return auth.currentUser;
};

export const signOutUser = async () => {
  await signOut(auth);
};
