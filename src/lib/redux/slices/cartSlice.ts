import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product, ProductVariant } from "@/lib/api/products";

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    let basePrice: number;
    let discountPercentage: number;

    if (item.variant) {
      basePrice = parseFloat(item.variant.price);
      discountPercentage = parseFloat(item.variant.discount || "0");
    } else {
      basePrice = parseFloat(item.product.price);
      discountPercentage = parseFloat(item.product.discount || "0");
    }

    const finalPrice = basePrice * (1 - discountPercentage / 100);
    return total + finalPrice * item.quantity;
  }, 0);
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  isOpen: false,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Cart data fetching actions
    fetchCartStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.subtotal = calculateSubtotal(state.items);
      state.isLoading = false;
      state.error = null;
    },
    fetchCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Cart operation actions
    cartOperationStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    cartOperationSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    cartOperationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update cart items directly (after API operations)
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.subtotal = calculateSubtotal(state.items);
    },

    // UI state actions
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Export actions
export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  cartOperationStart,
  cartOperationSuccess,
  cartOperationFailure,
  setCartItems,
  setCartOpen,
  toggleCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartSubtotal = (state: RootState) => state.cart.subtotal;
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;
export const selectCartLoading = (state: RootState) => state.cart.isLoading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
