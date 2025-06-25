import sahhaInstance from "./sahhaInstance";

// Cart API functions

export interface Cart {
  id: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  status: string;
  totalPrice: string;
  sessionId: string;
  userId: string;
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  createdAt: string;
  quantity: number;
  priceAtTime: string;
  variantId: string;
  cartId: string;
  variant: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    sku: string | null;
    price: string;
    discount: string;
    isAvailable: boolean;
    isDefault: boolean;
    productId: string;
    product: {
      id: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      sku: string | null;
      description: string;
      price: string;
      discount: string;
      averageRating: string;
      isFavourite: boolean;
      brandId: string;
      categoryId: string;
      media: {
        url: string;
        key: string;
        thumbnailUrl: string;
        thumbnailKey: string;
      }[];
    };
  };
}

export const cartApi = {
  getCart: () => sahhaInstance.get("/carts"),
  addToCart: (variantId: string | null, quantity: number) =>
    sahhaInstance.patch("/carts/add-to-cart", {
      variantId,
      quantity,
    }),
  removeFromCart: (variantId: string, quantity: number) =>
    sahhaInstance.patch("/carts/remove-from-cart", {
      variantId,
      quantity,
    }),
  getCartItemsCount: () => sahhaInstance.get("/carts/count"),
};
