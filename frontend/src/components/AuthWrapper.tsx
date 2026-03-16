'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAppDispatch } from '../store/hooks';
import { setCredentials, logout } from '../features/auth/authSlice';
import { clearCart } from '../features/cart/cartSlice';
import axios from 'axios';
import React from 'react';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8070/api'}/auth`, {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            avatar: firebaseUser.photoURL,
          }, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (response.data.success) {
            dispatch(setCredentials({
              user: response.data.data,
              token: idToken,
            }));
          }
        } catch (error) {
          console.error('Authentication error:', error);
          dispatch(logout());
          dispatch(clearCart());
        }
      } else {
        dispatch(logout());
        dispatch(clearCart());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
