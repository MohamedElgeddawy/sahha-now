import { Product } from "../api/products";
import { Cart, cartApi } from "../api/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

export const cartKeys = {
  all: ["cart"] as const,
  itemsCount: () => [...cartKeys.all, "itemsCount"] as const,
};

export const useCartItemsCount = () => {
  const { data: cartItemsCount } = useQuery({
    queryKey: cartKeys.itemsCount(),
    queryFn: async () => {
      try {
        const { data } = await cartApi.getCartItemsCount();
        return data.count;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch cart items count";
        throw error;
      }
    },
    initialData: 0,
  });
  return cartItemsCount;
};

export const useCart = () => {
  const queryClient = useQueryClient();
  const [localCart, setLocalCart] = useLocalStorage<Cart | null>("cart", null, {
    deserializer(value) {
      if (value) {
        return JSON.parse(value);
      }
      return null;
    },
    serializer(value) {
      return JSON.stringify(value);
    },
  });

  // Fetch cart data
  const cart = useQuery<Cart>({
    queryKey: cartKeys.all,
    queryFn: async () => {
      try {
        const { data } = await cartApi.getCart();

        setLocalCart(data);
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch cart";
        throw error;
      }
    },
    // Initialize the cart on component mount
    initialData: localCart
      ? localCart
      : {
          id: "",
          createdAt: "",
          cartItems: [],
          totalPrice: "0",
          sessionId: "",
          userId: "",
          status: "ACTIVE",
          expiresAt: null,
          updatedAt: "",
        },
  });

  // Add to cart mutation
  const addToCart = useMutation({
    mutationFn: async ({
      product,
      variantId,
      quantity = 1,
    }: {
      product?: Product;
      variantId?: string;
      quantity: number;
    }) => {
      const { data } = await cartApi.addToCart(
        variantId ?? product?.variants.find((v) => v.isDefault)?.id!,
        quantity
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({ queryKey: cartKeys.itemsCount() });
      toast.success("تمت الإضافة إلى السلة");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء إضافة المنتج إلى السلة";
      toast.error(errorMessage);
    },
  });

  // Remove from cart mutation
  const removeFromCart = useMutation({
    mutationFn: async ({
      variantId,
      quantity = 1,
    }: {
      variantId: string;
      quantity?: number;
    }) => {
      const { data } = await cartApi.removeFromCart(variantId, quantity);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({ queryKey: cartKeys.itemsCount() });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to remove item from cart";
      toast.error(errorMessage);
    },
  });

  return {
    // Actions
    addToCart,
    removeFromCart,

    // Cart
    cart,
  };
};
