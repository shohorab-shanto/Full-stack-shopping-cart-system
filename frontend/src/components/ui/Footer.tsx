'use client';

import React from 'react';
import { ShoppingCart, Facebook, Twitter, Instagram, Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl bg-indigo-600 text-white group-hover:scale-110 transition-transform">
                <ShoppingCart size={20} />
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tighter uppercase italic">
                CartFlow
              </span>
            </Link>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">
              Designing the future of e-commerce with a modern, clean, and professional interface.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">All Products</Link></li>
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">New Arrivals</Link></li>
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">Categories</Link></li>
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">Sale</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">Help Center</Link></li>
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">Shipping Info</Link></li>
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">Returns</Link></li>
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">Connect</h4>
            <div className="flex space-x-4">
              <Link href="/" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Facebook size={20} /></Link>
              <Link href="/" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Twitter size={20} /></Link>
              <Link href="/" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Instagram size={20} /></Link>
              <Link href="/" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Github size={20} /></Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 text-center space-y-2">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} CartFlow Inc. Built with Next.js & TailwindCSS.
          </p>
          <div className="flex justify-center space-x-4 text-xs font-bold text-gray-300 uppercase tracking-tighter">
            <Link href="/" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/" className="hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
