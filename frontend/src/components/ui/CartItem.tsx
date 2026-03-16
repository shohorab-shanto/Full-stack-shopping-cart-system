'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../features/cart/cartSlice';
import { QuantityControl } from './QuantityControl';
import { useAppDispatch } from '../../store/hooks';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.product_id));
    toast.error(`${item.product.name} removed from cart`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className="group p-6 flex items-center bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300">
      <div className="relative h-24 w-24 rounded-xl overflow-hidden mr-6 bg-gray-50 flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {item.product.name}
        </h3>
        <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">
          ${item.product.price}
        </p>
      </div>
      <div className="flex items-center space-x-6 mx-6">
        <QuantityControl
          quantity={item.quantity}
          onIncrement={() => dispatch(incrementQuantity(item.product_id))}
          onDecrement={() => dispatch(decrementQuantity(item.product_id))}
        />
        <div className="text-right w-24">
          <p className="text-xl font-bold text-gray-900">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="p-2.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
