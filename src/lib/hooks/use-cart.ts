import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setCartOpen,
  toggleCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartSubtotal,
  selectIsCartOpen,
} from "../redux/slices/cartSlice";
import { Product, ProductVariant } from "../api/products";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const isCartOpen = useAppSelector(selectIsCartOpen);

  const addToCart = (
    product: Product,
    variant: ProductVariant | null = null,
    quantity: number = 1
  ) => {
    dispatch(addItem({ product, variant, quantity }));
  };

  const removeFromCart = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  const openCart = () => {
    dispatch(setCartOpen(true));
  };

  const closeCart = () => {
    dispatch(setCartOpen(false));
  };

  const toggleCartOpen = () => {
    dispatch(toggleCart());
  };

  return {
    // State
    items: cartItems,
    totalItems,
    subtotal,
    isCartOpen,

    // Actions
    addToCart,
    removeFromCart,
    updateItemQuantity,
    emptyCart,
    openCart,
    closeCart,
    toggleCartOpen,
  };
};
