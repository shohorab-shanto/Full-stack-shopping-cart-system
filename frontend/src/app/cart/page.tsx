'use client';

import { useAppSelector } from '../../store/hooks';
import { useGetCartQuery } from '../../features/cart/cartApi';
import { ShoppingBag, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { CartItem } from '../../components/ui/CartItem';
import { CartSummary } from '../../components/ui/CartSummary';
import { CartItemSkeleton } from '../../components/ui/LoaderSkeleton';
import Link from 'next/link';
import React from 'react';

export default function CartPage() {
  const { items, isSyncing } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const { isLoading: isLoadingCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-in fade-in duration-500">
        <div className="p-6 bg-indigo-50 text-indigo-600 rounded-3xl">
          <ShoppingBag size={64} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Login Required</h2>
          <p className="text-gray-500 font-medium">Please sign in with Google to view and manage your shopping cart.</p>
        </div>
        <Link
          href="/"
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center text-sm font-extrabold text-indigo-600 uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter">Your <span className="text-indigo-600">Shopping</span> Cart</h1>
          <p className="text-gray-500 font-medium">You have {items.length} items in your collection.</p>
        </div>
        {isSyncing && (
          <div className="flex items-center px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 text-xs font-extrabold uppercase tracking-widest">
            <Loader2 className="animate-spin mr-2" size={14} />
            Syncing collection...
          </div>
        )}
      </div>

      {items.length === 0 && !isLoadingCart ? (
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-24 text-center space-y-8">
          <div className="inline-flex p-8 bg-gray-50 text-gray-200 rounded-full">
            <ShoppingBag size={80} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your collection is empty</h2>
            <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added any items yet. Discover our premium selection and find something you love.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-100"
          >
            <Sparkles size={20} className="mr-2" />
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            {isLoadingCart ? (
              Array.from({ length: 3 }).map((_, i) => (
                <CartItemSkeleton key={i} />
              ))
            ) : (
              items.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))
            )}
          </div>
          <div className="lg:col-span-1">
            <CartSummary items={items} isSyncing={isSyncing} />
          </div>
        </div>
      )}
    </div>
  );
}
