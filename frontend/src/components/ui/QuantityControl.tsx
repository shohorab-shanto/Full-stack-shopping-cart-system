'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityControl({ quantity, onIncrement, onDecrement }: QuantityControlProps) {
  return (
    <div className="flex items-center space-x-1 p-1 bg-gray-50 border border-gray-100 rounded-lg">
      <button
        onClick={onDecrement}
        className="p-1.5 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all duration-200"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center font-semibold text-sm text-gray-900 select-none">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="p-1.5 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all duration-200"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
