import { onAuthStateChanged } from '@firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../services/firebaseAuth';
import { setUser } from '../state/auth/authActionCreators';
import { actionCreators } from '../state';

export const useAuthStateChanged = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
        dispatch(actionCreators.getUserInfo(authUser.uid));
      }
      setLoading(false);
    });
    return () => listener();
  }, [dispatch]);
  return { loading };
};
