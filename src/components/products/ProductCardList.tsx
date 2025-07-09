import { Product } from "@/lib/api/products";
import React, { useState } from "react";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import FavoriteButton from "./FavoriteButton";
import AddToCart from "./AddToCart";
import QuantityCounter from "../ui/QuantityCounter";
import ProductQuickViewDialog from "./ProductQuickViewDialog";

type Props = {
  product: Partial<Product>;
  isLoading?: boolean;
  isFavorite?: boolean;
};

const ProductCardList = ({
  product,
  isLoading = false,
  isFavorite = false,
}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuickView, setShowQuickView] = useState(false);
  // Render skeleton UI when loading
  if (isLoading) {
    return (
      <div className="flex flex-row bg-white rounded-lg border border-gray-100 p-4 animate-pulse">
        <div className="h-[160px] w-[160px] rounded-lg overflow-hidden bg-gray-200" />
        <div className="flex-1 px-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  // Handle missing or invalid product data
  if (!product || !product.id) {
    return (
      <div className="flex flex-row bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="h-[160px] w-[160px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">صورة غير متاحة</span>
        </div>
        <div className="flex-1 px-4 flex items-center">
          <p className="text-gray-500">بيانات المنتج غير متاحة</p>
        </div>
      </div>
    );
  }

  // Safe access to nested properties with fallbacks
  const productName = product.arabicName || product.name || "منتج غير محدد";
  const brandName = product.brand?.arabicName || "";
  const imageUrl =
    product.media?.[0]?.thumbnailUrl || product.media?.[0]?.url || "";
  const price = product.price ? Number(product.price) : 0;
  const discount = product.discount ? Number(product.discount) : 0;
  const rating = product.averageRating ? parseInt(product.averageRating) : 0;
  const reviewCount = product._count?.reviews || 0;

  // Calculate discounted price safely
  const finalPrice = discount > 0 ? price - price * (discount / 100) : price;

  return (
    <>
      <ProductQuickViewDialog
        product={product as Product}
        open={showQuickView}
        onOpenChange={setShowQuickView}
      />
      <motion.div
        className="group relative bg-white rounded-lg border border-gray-100 overflow-hidden w-full shadow-sm hover:shadow-md transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          y: -2,
        }}
      >
        {/* Clean layout - Simple for mobile, Enhanced design for desktop */}
        <div className="flex flex-row p-2 sm:p-3 md:p-4 lg:p-4 gap-8 sm:gap-0">
          {/* Product Image */}
          <div className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-[140px] sm:h-[160px] md:h-[200px] lg:h-[240px] relative flex-shrink-0">
            <Link href={`/products/${product.id}`}>
              <div className="relative h-full w-full rounded-lg overflow-hidden bg-white">
                {/* Discount Badge */}
                {discount > 0 && (
                  <motion.div
                    className="absolute top-2 left-2 bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-bold z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    -{discount}%
                  </motion.div>
                )}

                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={productName}
                    fill
                    className="object-contain p-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-xs font-medium text-center px-2">
                      صورة غير متاحة
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Action buttons overlay - Responsive for tablet and mobile */}
            <div className="absolute top-2 right-2 items-center flex flex-col gap-1.5 sm:gap-2 z-10 md:hidden">
              <FavoriteButton
                productId={product.id!}
                isFavourite={product?.isFavourite || isFavorite}
                className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              />
              <motion.button
                className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowQuickView(true)}
                aria-label="عرض سريع للمنتج"
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </motion.button>
              <AddToCart
                product={product as Product}
                className="bg-green-500/90 hover:bg-green-600 text-white rounded-full p-1.5 sm:p-2 shadow-md transition-all"
              />
            </div>
          </div>

          {/* Product Content - Enhanced design for desktop */}
          <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col justify-between">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              {/* Product Title - Enhanced typography for desktop */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-gray-900 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight rtl:text-right line-clamp-2 hover:text-gray-700 transition-colors">
                    {productName}
                  </h3>
                </Link>
              </motion.div>

              {/* Brand - Enhanced design for desktop */}
              {brandName && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm md:text-base lg:text-lg text-gray-400 font-medium rtl:text-right"
                >
                  {brandName}
                </motion.div>
              )}

              {/* Price - Enhanced design for desktop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 rtl:justify-start md:gap-3 lg:gap-4"
              >
                <div className="flex items-center gap-1">
                  <span className="font-bold text-green-600 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    {finalPrice.toFixed(2)}
                  </span>
                  <span className="text-green-600 font-medium text-sm md:text-base lg:text-lg">
                    ر.س
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex text-sm md:text-base lg:text-lg text-gray-400 items-center gap-1">
                    <span className="line-through font-medium">
                      {price.toFixed(2)}
                    </span>
                    <span className="text-xs md:text-sm">ر.س</span>
                  </div>
                )}
              </motion.div>

              {/* Rating - desktop */}
              {rating > 0 && (
                <motion.div
                  className="hidden md:flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={cn("size-4 md:size-5", {
                          "text-yellow-400 fill-yellow-400": i < rating,
                          "text-gray-300 fill-gray-300": i >= rating,
                        })}
                      />
                    ))}
                  <span className="text-xs md:text-sm text-gray-500 font-medium mr-1">
                    ({reviewCount})
                  </span>
                </motion.div>
              )}
            </div>

            {/* Buy Button - Enhanced design Mobile/Tablet only) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-3 md:mt-4 lg:hidden"
            >
              <Link
                href={`/products/${product.id}`}
                className="inline-block w-40 py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-[#FF9B07] to-[#D35400] text-white text-center rounded-lg hover:from-[#F08C00] hover:to-[#E07B00] transition-all duration-300 font-bold text-sm md:text-base shadow-sm hover:shadow-md transform hover:scale-105"
              >
                اشتري الآن
              </Link>
            </motion.div>
          </div>

          {/* Desktop Right Section - Action Icons, Counter & Buy Button */}
          <div className="hidden lg:flex flex-col justify-between items-end min-w-[180px] xl:min-w-[200px]">
            {/* Top - Action Icons */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FavoriteButton
                productId={product.id!}
                isFavourite={product?.isFavourite || isFavorite}
                className="bg-white rounded-full p-2.5 shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              />
              <motion.button
                className="bg-white rounded-full p-2.5 shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {}}
                aria-label="عرض سريع للمنتج"
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </motion.button>
              <AddToCart
                product={product as Product}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              />
            </motion.div>

            {/* Bottom - Counter and Buy Button */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <QuantityCounter
                initialValue={quantity}
                onChange={(value) =>
                  setQuantity((prev) => Math.max(1, prev + value))
                }
              />
              <Link
                href={`/products/${product.id}`}
                className="w-64 h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF9B07] to-[#F08C00] text-white rounded-lg hover:from-[#F08C00] hover:to-[#E07B00] transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 p-4"
              >
                اشتري الآن
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCardList;
