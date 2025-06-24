import sahhaInstance from "./sahhaInstance";

// Cart API functions
export const cartApi = {
  getCart: () => sahhaInstance.get("/carts"),
  addToCart: (productId: string, variantId: string | null, quantity: number) =>
    sahhaInstance.post("/carts/add-to-cart", {
      productId,
      variantId,
      quantity,
    }),
  removeFromCart: (itemId: string, quantity: number) =>
    sahhaInstance.post("/carts/remove-from-cart", { itemId, quantity }),
  updateQuantity: (itemId: string, quantity: number) =>
    sahhaInstance.post("/carts/update-quantity", { itemId, quantity }),
};
