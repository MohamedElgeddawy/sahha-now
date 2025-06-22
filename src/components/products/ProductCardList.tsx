import { Product } from "@/lib/api/products";
import React, { useRef } from "react";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useHover } from "usehooks-ts";
import { motion, AnimatePresence } from "motion/react";
import FavoriteButton from "./FavoriteButton";

type Props = {
  product: Partial<Product>;
  isLoading?: boolean;
};

const ProductCardList = ({ product, isLoading = false }: Props) => {
  // Render skeleton UI when loading
  if (isLoading) {
    return (
      <div className="flex flex-row bg-white rounded-lg border border-gray-100 p-4 animate-pulse">
        <div className="h-[180px] w-[180px] rounded-lg overflow-hidden bg-gray-200" />
        <div className="flex-1 px-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/5" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="group relative flex flex-row bg-white rounded-lg border border-gray-100 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        y: -5,
      }}
    >
      <div className="flex-1 flex items-stretch">
        <div className="w-[180px] h-[180px] relative">
          <Link href={`/products/${product.id}`}>
            <div className="relative h-full w-full rounded-lg overflow-hidden bg-white">
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
              <div>
                <Image
                  src={product?.media?.[0]?.thumbnailUrl || ""}
                  alt={product?.name || ""}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-6 flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href={`/products/${product.id}`}>
              <h3 className="text-gray-700 font-semibold text-xl rtl:text-right">
                {product.name}
              </h3>
            </Link>
            <div className="text-sm text-gray-500 rtl:text-right">
              {product.category?.name}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="font-medium text-green-500 text-xl">
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
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 mt-2"
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
        </div>

        <div className="basis-1/4 flex flex-col justify-between">
          <motion.div
            className="flex justify-end items-center gap-6"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {/* Action buttons */}
            <AnimatePresence>
              <FavoriteButton
                productId={product.id!}
                isFavorite={product.isFavourite}
              />
              <motion.button
                className="bg-white rounded-full p-2 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                className="bg-green-500 rounded-full p-2 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </motion.button>
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={`/products/${product.id}`}
              className="py-3 px-10 text-center block bg-[#FF9B07] text-white rounded-lg hover:bg-[#F08C00] transition-colors rtl:text-center"
            >
              اشتري الآن
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardList;
