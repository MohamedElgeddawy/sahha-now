import React from "react";
import { Heart, Loader2 } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

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
  isFavourite?: boolean;
  className?: string;
}

const FavoriteButton = ({
  productId,
  isFavourite,
  className,
}: FavoriteButtonProps) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async () => {
      const response = await sahhaInstance.post(`/favourites/${productId}`);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate all relevant queries
      queryClient.invalidateQueries({
        queryKey: productKeys.favoritesCount(),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.infinite({}),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.favorites(),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.offers(),
      });

      // Show success message based on the action performed
      if (data?.action === "added" || !isFavourite) {
        toast.success("تم إضافة المنتج إلى المفضلة بنجاح");
      } else {
        toast.success("تم إزالة المنتج من المفضلة");
      }
    },
    onError: (error: any) => {
      console.error("Error toggling favorite:", error);

      // Handle different error scenarios
      if (error.response?.status === 401) {
        toast.error("يرجى تسجيل الدخول أولاً");
        router.push("/auth/login");
      } else if (error.response?.status === 404) {
        toast.error("المنتج غير موجود");
      } else if (error.response?.status === 429) {
        toast.error("تم تجاوز الحد المسموح، يرجى المحاولة لاحقاً");
      } else if (error.response?.status >= 500) {
        toast.error("خطأ في الخادم، يرجى المحاولة لاحقاً");
      } else {
        toast.error(
          error.response?.data?.message ||
            "حدث خطأ أثناء تحديث المفضلة، يرجى المحاولة مرة أخرى"
        );
      }
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
      className={cn(
        "bg-white rounded-full p-1.5 md:p-2 shadow-sm cursor-pointer transition-all duration-200",
        {
          "opacity-50 cursor-not-allowed": isPending,
        },
        className
      )}
      onClick={handleToggleFavorite}
      whileHover={{ scale: isPending ? 1 : 1.1 }}
      whileTap={{ scale: isPending ? 1 : 0.9 }}
      disabled={isPending}
      aria-label={isFavourite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-gray-600" />
      ) : (
        <Heart
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 transition-colors duration-200",
            {
              "fill-red-500 text-red-500": isFavourite,
              "text-gray-600 hover:text-red-400": !isFavourite,
            }
          )}
        />
      )}
    </motion.button>
  );
};

export default FavoriteButton;
