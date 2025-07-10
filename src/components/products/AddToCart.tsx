import { Loader2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { cartKeys, useCart } from "@hooks/use-cart";
import { Product, ProductVariant } from "@api/products";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@utils";

interface AddToCartProps {
  product: Product;
  variant?: ProductVariant | null;
  quantity?: number;
  className?: string;
}

const AddToCart = ({
  product,
  quantity = 1,
  className = "",
}: AddToCartProps) => {
  const { addToCart } = useCart();
  const queryClient = useQueryClient();
  const handleAddToCart = () => {
    addToCart.mutate({ product, quantity });
    queryClient.invalidateQueries({
      queryKey: cartKeys.itemsCount(),
    });
  };

  return (
    <motion.button
      className={cn(
        "bg-green-500 rounded-full cursor-pointer hover:bg-green-600 p-1.5 md:p-2 shadow-sm",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleAddToCart}
      aria-label="إضافة إلى السلة"
    >
      {addToCart.isPending ? (
        <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-white animate-spin" />
      ) : (
        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white" />
      )}
    </motion.button>
  );
};

export default AddToCart;
