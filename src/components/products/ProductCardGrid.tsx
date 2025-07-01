import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/api/products";
import Link from "next/link";
import { useHover } from "usehooks-ts";
import { motion, AnimatePresence } from "motion/react";
import ProductQuickView from "./ProductQuickView";
import FavoriteButton from "./FavoriteButton";
import AddToCart from "./AddToCart";

type Props = {
  product: Partial<Product>;
  isLoading?: boolean;
};

export const ProductCardGridSkeleton = () => {
  return (
    <div className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100 p-6" />
      <div className="p-4 space-y-3">
        <div className="min-h-[3rem]">
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-11 bg-gray-200 rounded-lg w-full mt-2" />
      </div>
    </div>
  );
};

const ProductCardGrid = ({ product, isLoading = false }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovering = useHover<HTMLDivElement>(
    cardRef as React.RefObject<HTMLDivElement>
  );
  const [showQuickView, setShowQuickView] = useState(false);

  // Render skeleton UI when loading
  if (isLoading) {
    return <ProductCardGridSkeleton />;
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className="group relative block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          y: -5,
        }}
      >
        <div className="relative aspect-square bg-gray-50 p-4 sm:p-6">
          {/* Discount Badge - Top Left */}
          {product.discount && parseInt(product.discount) > 0 && (
            <motion.div
              className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#FDEDEC] text-red-500 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {product.discount}%-
            </motion.div>
          )}

          {/* Right Side Action Buttons - Always Visible on Mobile, Hover on Desktop */}
          <div
            className={cn(
              "absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-3 z-20 transition-opacity duration-200",
              "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            )}
          >
            <FavoriteButton
              productId={product.id!}
              isFavourite={product.isFavourite}
              className="bg-white rounded-full p-2 sm:p-2.5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
            />
            <motion.button
              className="bg-white rounded-full p-2 sm:p-2.5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </motion.button>
            <AddToCart
              product={product as Product}
              quantity={1}
              className="bg-green-500 hover:bg-green-600 active:bg-green-600 rounded-full p-2 sm:p-2.5 shadow-md transition-all"
            />
          </div>

          <div className="w-full h-full flex items-center justify-center p-2 sm:p-0">
            <div className="relative w-full h-full max-w-[120px] max-h-[150px] sm:max-w-[160px] sm:max-h-[200px]">
              <Image
                src={product?.media?.[0]?.thumbnailUrl || ""}
                alt={product?.name || ""}
                fill
                sizes="(max-width: 640px) 120px, 160px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="min-h-[3rem]"
          >
            <h3 className="text-gray-900 line-clamp-1 font-medium text-base leading-snug mb-1">
              {product.arabicName}
            </h3>
            <span className="text-xs text-gray-500">
              {product.category?.arabicName}
            </span>
          </motion.div>

          {/* Price */}
          <motion.div
            className="flex items-baseline gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Number(product?.discount) ? (
              <>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-400 line-through">
                    {product?.price} ر.س
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-green-600 text-xl">
                    {(
                      Number(product?.price) -
                      Number(product?.price) * (Number(product?.discount) / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="text-green-600 text-sm font-medium">
                    ر.س
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-green-600 text-xl">
                  {product?.price}
                </span>
                <span className="text-green-600 text-sm font-medium">ر.س</span>
              </div>
            )}
          </motion.div>

          {/* Add to Cart Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2"
          >
            <Link
              prefetch
              href={`/products/${product.id}`}
              className="w-full py-2 text-center block bg-[#FF9B07] text-white rounded-lg hover:bg-[#F08C00] active:bg-[#F08C00] focus:bg-[#FF9B07] transition-colors"
            >
              اشتري الآن
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Product Quick View Modal */}
      {showQuickView && (
        <ProductQuickView
          product={product as Product}
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};

export default ProductCardGrid;
