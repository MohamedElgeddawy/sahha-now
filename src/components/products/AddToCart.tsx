import { Loader2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { useCart } from "@/lib/hooks/use-cart";
import { Product, ProductVariant } from "@/lib/api/products";
import { toast } from "sonner";

interface AddToCartProps {
  product: Product;
  variant?: ProductVariant | null;
  quantity?: number;
  className?: string;
}

const AddToCart = ({
  product,
  variant = null,
  quantity = 1,
  className = "",
}: AddToCartProps) => {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    addToCart.mutate(
      { product, variant, quantity },
      {
        onSuccess: () => {
          toast.success("تمت الإضافة إلى السلة");
          openCart();
        },
        onError: () => {
          toast.error("حدث خطأ أثناء إضافة المنتج إلى السلة");
        },
      }
    );
  };

  return (
    <motion.button
      className={`bg-green-500 rounded-full cursor-pointer hover:bg-green-600 p-2 shadow-sm ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleAddToCart}
      aria-label="إضافة إلى السلة"
    >
      {addToCart.isPending ? (
        <Loader2 className="w-5 h-5 text-white animate-spin" />
      ) : (
        <ShoppingCart className="w-5 h-5 text-white" />
      )}
    </motion.button>
  );
};

export default AddToCart;
