'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCart, setSyncing } from '../features/cart/cartSlice';
import { useGetCartQuery, useBatchUpdateCartMutation } from '../features/cart/cartApi';
import _ from 'lodash';

export function CartSyncManager() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const { data: initialCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  
  const [batchUpdateCart] = useBatchUpdateCartMutation();
  const initialLoaded = useRef(false);
  const lastSyncedItems = useRef<CartItem[]>([]);

  // Load initial cart from backend (ONLY ONCE)
  useEffect(() => {
    if (initialCart && !initialLoaded.current) {
      dispatch(setCart(initialCart));
      lastSyncedItems.current = initialCart;
      initialLoaded.current = true;
    }
  }, [initialCart, dispatch]);

  // Reset flag on logout
  useEffect(() => {
    if (!isAuthenticated) {
      initialLoaded.current = false;
      lastSyncedItems.current = [];
    }
  }, [isAuthenticated]);

  // Debounced sync function
  const debouncedSync = useCallback(
    _.debounce(async (cartItems: CartItem[]) => {
      if (!isAuthenticated) return;
      
      // Final check: if the items are already the same as what we last successfully pushed, skip.
      if (_.isEqual(cartItems, lastSyncedItems.current)) {
        return;
      }

      dispatch(setSyncing(true));
      try {
        const syncItems = cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        }));
        
        await batchUpdateCart({ items: syncItems }).unwrap();
        // Success: update the 'last synced' ref so we don't push the same thing again
        lastSyncedItems.current = cartItems;
      } catch (error) {
        console.error('Sync error:', error);
      } finally {
        dispatch(setSyncing(false));
      }
    }, 2500), // Increased to 2.5s to group many clicks into ONE call
    [isAuthenticated, batchUpdateCart, dispatch]
  );

  // Sync whenever items change (after initial load)
  useEffect(() => {
    if (initialLoaded.current && !_.isEqual(items, lastSyncedItems.current)) {
      debouncedSync(items);
    }
  }, [items, debouncedSync]);

  return null;
}
