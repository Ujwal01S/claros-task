import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "@/types/product.types";

export interface ICartItem extends Omit<IProduct, "category" | "images"> {
  image: string;
  quantity: number;
  subtotal: number;
}

export interface CartState {
  cartItems: ICartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const calculateSubtotal = (price: number, quantity: number) => price * quantity;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.cartItems.find((i) => i.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
        existing.subtotal = calculateSubtotal(
          existing.price,
          existing.quantity,
        );
      } else {
        state.cartItems.push({
          id: action.payload.id,
          title: action.payload.title,
          slug: action.payload.slug,
          price: action.payload.price,
          description: action.payload.description,
          image: action.payload.images[0] || "",
          quantity: 1,
          subtotal: calculateSubtotal(action.payload.price, 1),
        });
      }
    },

    updateQuantities: (
      state,
      action: PayloadAction<{ id: number; quantity: number }[]>,
    ) => {
      const map = new Map(action.payload.map((u) => [u.id, u.quantity]));

      state.cartItems = state.cartItems
        .map((item) => {
          const q = map.get(item.id);
          if (q === undefined) return item;
          if (q < 1) return null;

          return {
            ...item,
            quantity: q,
            subtotal: calculateSubtotal(item.price, q),
          };
        })
        .filter(Boolean) as ICartItem[];
    },

    completelyRemoveItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateQuantities, completelyRemoveItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.cartItems;
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.cartItems.reduce((sum, i) => sum + i.subtotal, 0);
export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.cartItems.reduce((sum, i) => sum + i.quantity, 0);
