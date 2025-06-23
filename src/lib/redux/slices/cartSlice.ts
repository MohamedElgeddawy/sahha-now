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

const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    try {
      return JSON.parse(storedCart);
    } catch (e) {
      console.error("Error parsing cart from storage:", e);
      return [];
    }
  }
  return [];
};

const updateCartStorage = (items: CartItem[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

const initialItems = getCartFromStorage();

const initialState: CartState = {
  items: initialItems,
  totalItems: initialItems.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: calculateSubtotal(initialItems),
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        product: Product;
        variant: ProductVariant | null;
        quantity: number;
      }>
    ) => {
      const { product, variant, quantity } = action.payload;
      const cartItemId = variant ? `${product.id}-${variant.id}` : product.id;

      const existingItemIndex = state.items.findIndex((item) =>
        variant
          ? item.id === cartItemId
          : item.id === product.id && item.variant === null
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          id: cartItemId,
          product,
          variant,
          quantity,
        });
      }

      // Update totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.subtotal = calculateSubtotal(state.items);

      // Update storage
      updateCartStorage(state.items);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      // Update totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.subtotal = calculateSubtotal(state.items);

      // Update storage
      updateCartStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;

      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity;
        } else {
          // Remove item if quantity is 0 or negative
          state.items.splice(itemIndex, 1);
        }

        // Update totals
        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.subtotal = calculateSubtotal(state.items);

        // Update storage
        updateCartStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;

      // Update storage
      updateCartStorage(state.items);
    },

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
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setCartOpen,
  toggleCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartSubtotal = (state: RootState) => state.cart.subtotal;
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;

export default cartSlice.reducer;
