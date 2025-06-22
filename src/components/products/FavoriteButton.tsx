import React from "react";
import { Heart, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

import { selectIsAuthenticated } from "@/lib/redux/slices/authSlice";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sahhaInstance from "@/lib/api/sahhaInstance";
import { productKeys } from "@/lib/hooks/use-products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  productId: string;
  isFavorite?: boolean;
  className?: string;
}

const FavoriteButton = ({
  productId,
  isFavorite,
  className,
}: FavoriteButtonProps) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const queryClient = useQueryClient();
  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async () => {
      return await sahhaInstance.post(`/products/${productId}/favourites`);
    },
    onSuccess: () => {
      toast.success("تم إضافة المنتج إلى المفضلة");
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.infinite({}),
      });
    },
  });

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/auth/login");
      toast.error("من فضلك قم بتسجيل الدخول لإضافة المنتج إلى المفضلة");
      return;
    }
    toggleFavorite();
  };

  return (
    <motion.button
      className={cn("bg-white rounded-full p-2 shadow-sm cursor-pointer", className)}
      onClick={handleToggleFavorite}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <Heart
          className={cn("size-5", {
            "fill-red-500 text-red-500": isFavorite,
            "text-gray-600": !isFavorite,
          })}
        />
      )}
    </motion.button>
  );
};

export default FavoriteButton;
