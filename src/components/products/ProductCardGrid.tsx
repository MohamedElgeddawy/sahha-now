import React, { useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Heart, Eye, Scale, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/api/products";
import Link from "next/link";
import { useHover } from "usehooks-ts";
import { motion, AnimatePresence } from "motion/react";
import FavoriteButton from "./FavoriteButton";

type Props = {
  product: Partial<Product>;
  isLoading?: boolean;
};

export const ProductCardGridSkeleton = () => {
  return (
    <div className="block bg-white rounded-lg border border-gray-100 p-4 animate-pulse">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200" />
      <div className="mt-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
};

const ProductCardGrid = ({ product, isLoading = false }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovering = useHover<HTMLDivElement>(
    cardRef as React.RefObject<HTMLDivElement>
  );
  // Render skeleton UI when loading
  if (isLoading) {
    return <ProductCardGridSkeleton />;
  }

  // Return early if product is missing required data
  // if (!product.id || !product.name || !product.media) {
  //   return null;
  // }

  return (
    <motion.div
      ref={cardRef}
      className="group relative block bg-white rounded-lg border border-gray-100 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        y: -5,
      }}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
        {/* Discount Badge */}
        {product.discount && parseInt(product.discount) > 0 && (
          <motion.div
            className="absolute top-2 right-2 bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-medium z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            -{product.discount}%
          </motion.div>
        )}

        {/* Side action buttons */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              className="absolute top-2 left-2 flex flex-col gap-2 z-20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            >
              <FavoriteButton
                productId={product.id!}
                isFavorite={product.isFavourite}
              />
              <motion.button
                className="bg-white rounded-full p-2 shadow-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                className="bg-white rounded-full p-2 shadow-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Scale className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                className="bg-green-500 rounded-full p-2 shadow-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <Image
            src={product?.media?.[0]?.thumbnailUrl || ""}
            alt={product?.name || ""}
            fill
            className="object-contain p-3"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-gray-600 line-clamp-2 font-semibold text-lg">
            {product.name}
          </h3>
          <span className="text-xs text-gray-500">
            {product.category?.name}
          </span>
        </motion.div>
        {/* Price */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1">
            <span className="font-medium text-green-500">
              {Number(product?.discount)
                ? Number(product?.price) -
                  Number(product?.price) * (Number(product?.discount) / 100)
                : product?.price}
            </span>
            <span className="text-green-500">ر.س</span>
          </div>
          {Number(product?.discount) ? (
            <div className="flex text-sm text-gray-400 items-center relative gap-1 before:content-[''] before:w-full before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0">
              <span>{product?.price}</span>
              <span>ر.س</span>
            </div>
          ) : null}
        </motion.div>

        {/* Rating */}
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={cn("size-4", {
                  "text-[#FFA726] fill-[#FFA726]":
                    i < (parseInt(product.averageRating!) || 0),
                  "text-gray-300 fill-gray-300":
                    i >= (parseInt(product.averageRating!) || 0),
                })}
              />
            ))}
          <span className="text-xs text-gray-500">
            ({product?._count?.reviews || 0})
          </span>
        </motion.div>

        {/* Add to Cart Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            prefetch
            href={`/products/${product.id}`}
            className="w-full py-2 text-center block bg-[#FF9B07] text-white rounded-lg hover:bg-[#F08C00] transition-colors"
          >
            اشتري الآن
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCardGrid;
