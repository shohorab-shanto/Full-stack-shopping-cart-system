'use client';

import { useGetProductsQuery } from '../features/products/productsApi';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductCardSkeleton } from '../components/ui/LoaderSkeleton';
import { Sparkles } from 'lucide-react';
import React from 'react';

export default function Home() {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isError) return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      <div className="p-4 bg-red-50 text-red-500 rounded-2xl">
        <Sparkles size={48} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Something went wrong</h2>
      <p className="text-gray-500 font-medium">We couldn't load the products. Please try again later.</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-extrabold uppercase tracking-widest">
          <Sparkles size={14} />
          <span>New Collection 2026</span>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter leading-none">
          Discover Our <span className="text-indigo-600">Premium</span> Selection
        </h1>
        <p className="text-lg text-gray-500 font-medium leading-relaxed">
          Curated collection of high-quality products designed for your modern lifestyle.
          Experience the future of shopping today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : (
          data?.data.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
