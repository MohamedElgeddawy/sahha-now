import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setCartItems,
  setCartOpen,
  toggleCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartSubtotal,
  selectIsCartOpen,
  selectCartLoading,
  selectCartError,
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  cartOperationStart,
  cartOperationSuccess,
  cartOperationFailure,
} from "../redux/slices/cartSlice";
import { Product, ProductVariant } from "../api/products";
import { cartApi } from "../api/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // Redux state selectors
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const isLoading = useAppSelector(selectCartLoading);
  const error = useAppSelector(selectCartError);

  // Fetch cart data
  const { refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      dispatch(fetchCartStart());
      try {
        const { data } = await cartApi.getCart();
        dispatch(fetchCartSuccess(data.items));
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch cart";
        dispatch(fetchCartFailure(errorMessage));
        throw error;
      }
    },
    // Initialize the cart on component mount
    initialData: { items: cartItems },
  });

  // Add to cart mutation
  const { mutate: addToCart } = useMutation({
    mutationFn: async ({
      product,
      variant,
      quantity = 1,
    }: {
      product: Product;
      variant: ProductVariant | null;
      quantity: number;
    }) => {
      dispatch(cartOperationStart());
      const productId = product.id;
      const variantId = variant?.id || null;

      const { data } = await cartApi.addToCart(productId, variantId, quantity);
      return data;
    },
    onSuccess: (data) => {
      dispatch(setCartItems(data.items));
      dispatch(cartOperationSuccess());
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add item to cart";
      dispatch(cartOperationFailure(errorMessage));
    },
  });

  // Remove from cart mutation
  const { mutate: removeFromCart } = useMutation({
    mutationFn: async ({
      itemId,
      quantity = 1,
    }: {
      itemId: string;
      quantity?: number;
    }) => {
      dispatch(cartOperationStart());
      const { data } = await cartApi.removeFromCart(itemId, quantity);
      return data;
    },
    onSuccess: (data) => {
      dispatch(setCartItems(data.items));
      dispatch(cartOperationSuccess());
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to remove item from cart";
      dispatch(cartOperationFailure(errorMessage));
    },
  });

  // Update quantity mutation
  const { mutate: updateItemQuantity } = useMutation({
    mutationFn: async ({
      itemId,
      quantity = 1,
    }: {
      itemId: string;
      quantity?: number;
    }) => {
      dispatch(cartOperationStart());
      const { data } = await cartApi.updateQuantity(itemId, quantity);
      return data;
    },
    onSuccess: (data) => {
      dispatch(setCartItems(data.items));
      dispatch(cartOperationSuccess());
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update item quantity";
      dispatch(cartOperationFailure(errorMessage));
    },
  });

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
    isLoading,
    error,

    // Actions
    addToCart,
    removeFromCart,
    updateItemQuantity,
    openCart,
    closeCart,
    toggleCartOpen,
    refetchCart: refetch,
  };
};
