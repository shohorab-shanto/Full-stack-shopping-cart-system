'use client';

import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../../features/cart/cartSlice';

interface CartSummaryProps {
  items: CartItem[];
  isSyncing: boolean;
}

export function CartSummary({ items, isSyncing }: CartSummaryProps) {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax example
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6 sticky top-24">
      <div className="flex items-center space-x-2 pb-4 border-b border-gray-50">
        <ShoppingBag className="text-indigo-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-500 font-medium">
          <span>Items ({items.length})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 font-medium">
          <span>Shipping</span>
          <span className="text-green-600 font-bold uppercase tracking-tight">Free</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 font-medium">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 uppercase tracking-tighter">Total Amount</span>
          <span className="text-3xl font-extrabold text-indigo-600 tracking-tighter">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        disabled={isSyncing || items.length === 0}
        className="group w-full bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100 flex items-center justify-center space-x-3"
      >
        <span>Checkout Now</span>
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
      </button>

      <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 font-medium">
        <CheckCircle2 size={14} className="text-green-500" />
        <span>Secure checkout powered by Stripe</span>
      </div>
    </div>
  );
}
