'use client';

import React, { useEffect } from 'react';
import { signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';
import { useAppSelector } from '../../store/hooks';
import { useRouter } from 'next/navigation';
import { LogIn, ShoppingCart, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      // Set persistence to session (clears when tab/browser is closed)
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl shadow-indigo-100/50 border border-gray-100 p-10 space-y-8 animate-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 animate-bounce">
            <ShoppingCart size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter">Welcome to <span className="text-indigo-600">CartFlow</span></h1>
            <p className="text-gray-500 font-medium leading-relaxed">
              Sign in to manage your premium shopping collection and experience modern e-commerce.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold text-gray-700 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="pt-6 border-t border-gray-50">
          <div className="flex items-center justify-center space-x-2 text-xs font-extrabold text-gray-300 uppercase tracking-widest">
            <Sparkles size={14} className="text-indigo-300" />
            <span>Secured by Firebase Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
