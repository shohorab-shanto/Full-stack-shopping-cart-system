'use client';

import Link from 'next/link';
import { ShoppingCart, LogIn, LogOut, User, Menu, X, ShoppingBag } from 'lucide-react';
import { signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useAppSelector } from '../store/hooks';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const navLinks = [
    { name: 'Products', href: '/' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl bg-indigo-600 text-white group-hover:scale-110 transition-transform shadow-md shadow-indigo-100">
                <ShoppingCart size={20} />
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tighter uppercase italic">
                CartFlow
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-extrabold uppercase tracking-widest transition-colors hover:text-indigo-600 ${
                  pathname === link.href ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:scale-110 transition-all active:scale-95 group"
            >
              <ShoppingBag size={22} className="group-hover:animate-pulse" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-extrabold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 border-l border-gray-100 pl-4 ml-4">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900 leading-none">{user?.name}</p>
                    <p className="text-xs font-semibold text-gray-400 mt-0.5 leading-none">Standard User</p>
                  </div>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full ring-2 ring-indigo-50 group-hover:ring-indigo-200 transition-all" />
                  ) : (
                    <div className="p-2 rounded-full bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100">
                      <User size={18} />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-all active:scale-95"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-extrabold uppercase tracking-widest text-xs hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-md shadow-indigo-100 flex items-center space-x-2"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-extrabold uppercase tracking-widest ${
                  pathname === link.href ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
