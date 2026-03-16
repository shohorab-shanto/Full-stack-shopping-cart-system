import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  id?: number;
  product_id: number;
  quantity: number;
  product: Product;
}

interface CartState {
  items: CartItem[];
  isSyncing: boolean;
}

const initialState: CartState = {
  items: [],
  isSyncing: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product_id: action.payload.id,
          quantity: 1,
          product: action.payload,
        });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.product_id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.product_id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(
          (i) => i.product_id !== action.payload
        );
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ product_id: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (item) {
        if (action.payload.quantity === 0) {
          state.items = state.items.filter(
            (i) => i.product_id !== action.payload.product_id
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product_id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.isSyncing = false;
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
  },
});

export const {
  setCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  removeFromCart,
  clearCart,
  setSyncing,
} = cartSlice.actions;

export default cartSlice.reducer;
