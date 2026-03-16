'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:border-indigo-100 transition-all duration-300">
      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
        <span className="text-2xl font-bold text-gray-900">
          ${product.price}
        </span>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-sm shadow-indigo-200"
          aria-label="Add to cart"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}
