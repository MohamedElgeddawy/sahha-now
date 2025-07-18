import React, { useState } from "react";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import FavoriteButton from "./FavoriteButton";
import AddToCart from "./AddToCart";
import QuantityCounter from "@components/ui/QuantityCounter";
import ProductQuickViewDialog from "./ProductQuickViewDialog";
import { Product } from "@api/products";
import { cn } from "@utils";
import { useMediaQuery, useIsClient } from "usehooks-ts";

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
  const isClient = useIsClient();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
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
        className="group relative bg-white rounded-lg border border-gray-100 overflow-hidden w-full shadow-sm hover:shadow-md transition-all duration-300 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          y: -2,
        }}
      >
        {/* Clean layout - Responsive design for all screen sizes */}
        <div
          className={cn(
            "flex flex-row gap-2 sm:gap-4",
            isClient && isMobile
              ? "p-2"
              : isClient && isTablet
              ? "p-3"
              : "p-3 md:p-4 lg:p-4"
          )}
        >
          {/* Product Image */}
          <div
            className={cn(
              "relative flex-shrink-0",
              isClient && isMobile
                ? "w-[120px] h-[100px]"
                : isClient && isTablet
                ? "w-[160px] h-[140px]"
                : "w-[200px] h-[160px]"
            )}
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative h-full w-full rounded-lg overflow-hidden bg-white">
                {/* Discount Badge */}
                {discount > 0 && (
                  <motion.div
                    className={cn(
                      "absolute bg-red-50 text-red-600 rounded-md font-bold z-10",
                      isClient && isMobile
                        ? "top-1 left-1 px-1.5 py-0.5 text-xs"
                        : isClient && isTablet
                        ? "top-1.5 left-1.5 px-2 py-1 text-xs"
                        : "top-2 left-2 px-2 py-1 text-xs"
                    )}
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
            <div
              className={cn(
                "absolute top-2 right-1 items-center flex flex-col gap-2 z-10",
                isClient && !isTablet ? "hidden" : "flex"
              )}
            >
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

          {/* Product Content - Responsive design for all screen sizes */}
          <div
            className={cn(
              "flex-1 flex flex-col justify-between",
              isClient && isMobile
                ? "px-2"
                : isClient && isTablet
                ? "px-3"
                : "px-3 sm:px-4 md:px-6"
            )}
          >
            <div
              className={cn(
                isClient && isMobile
                  ? "space-y-1.5"
                  : isClient && isTablet
                  ? "space-y-2"
                  : "space-y-2 md:space-y-3 lg:space-y-4"
              )}
            >
              {/* Product Title - Responsive typography */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link href={`/products/${product.id}`}>
                  <h3
                    className={cn(
                      "text-gray-900 leading-tight rtl:text-right line-clamp-2 hover:text-gray-700 transition-colors",
                      isClient && isMobile
                        ? "text-sm line-clamp-1"
                        : isClient && isTablet
                        ? "text-base line-clamp-2"
                        : "text-lg md:text-xl lg:text-2xl line-clamp-2"
                    )}
                  >
                    {productName}
                  </h3>
                </Link>
              </motion.div>

              {/* Brand - Responsive design */}
              {brandName && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className={cn(
                    "text-gray-400 font-medium rtl:text-right",
                    isClient && isMobile
                      ? "text-xs"
                      : isClient && isTablet
                      ? "text-sm"
                      : "text-sm md:text-base lg:text-lg"
                  )}
                >
                  {brandName}
                </motion.div>
              )}

              {/* Price - Responsive design */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={cn(
                  "flex items-start flex-col rtl:justify-start",
                  isClient && isMobile
                    ? "gap-1 flex-wrap"
                    : isClient && isTablet
                    ? "gap-2"
                    : "gap-2"
                )}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      "font-bold text-green-600",
                      isClient && isMobile
                        ? "text-sm"
                        : isClient && isTablet
                        ? "text-base"
                        : "text-lg sm:text-xl md:text-2xl"
                    )}
                  >
                    {finalPrice.toFixed(2)}
                  </span>
                  <span
                    className={cn(
                      "text-green-600 font-medium",
                      isClient && isMobile
                        ? "text-xs"
                        : isClient && isTablet
                        ? "text-sm"
                        : "text-sm md:text-base lg:text-lg"
                    )}
                  >
                    ر.س
                  </span>
                </div>

                {discount > 0 && (
                  <div
                    className={cn(
                      "flex text-gray-400 items-center gap-1",
                      isClient && isMobile
                        ? "text-xs"
                        : isClient && isTablet
                        ? "text-sm"
                        : "text-sm md:text-base lg:text-lg"
                    )}
                  >
                    <span className="line-through font-medium">
                      {price.toFixed(2)}
                    </span>
                    <span
                      className={cn(
                        isClient && isMobile ? "text-xs" : "text-xs md:text-sm"
                      )}
                    >
                      ر.س
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Rating - Responsive design */}
              {rating > 0 && (
                <motion.div
                  className={cn("flex items-center gap-1")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          isClient && isMobile
                            ? "size-3"
                            : isClient && isTablet
                            ? "size-4"
                            : "size-4 md:size-5",
                          {
                            "text-yellow-400 fill-yellow-400": i < rating,
                            "text-gray-300 fill-gray-300": i >= rating,
                          }
                        )}
                      />
                    ))}
                  <span
                    className={cn(
                      "text-gray-500 font-medium mr-1",
                      isClient && isMobile
                        ? "text-xs"
                        : isClient && isTablet
                        ? "text-xs"
                        : "text-xs md:text-sm"
                    )}
                  >
                    ({reviewCount})
                  </span>
                </motion.div>
              )}
            </div>

            {/* Buy Button - Responsive design for mobile/tablet */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                isClient && isMobile
                  ? "mt-2"
                  : isClient && isTablet
                  ? "mt-3"
                  : "mt-3 md:mt-4",
                isClient && !isTablet ? "hidden" : "block"
              )}
            >
              <Link
                href={`/products/${product.id}`}
                className={cn(
                  "inline-block bg-gradient-to-r from-[#FF9B07] to-[#D35400] text-white text-center rounded-lg hover:from-[#F08C00] hover:to-[#E07B00] transition-all duration-300 font-bold shadow-sm hover:shadow-md transform hover:scale-105",
                  isClient && isMobile
                    ? "w-full py-2 px-3 text-xs"
                    : isClient && isTablet
                    ? "w-40 py-2.5 px-4 text-sm"
                    : "w-40 py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-sm md:text-base"
                )}
              >
                اشتري الآن
              </Link>
            </motion.div>
          </div>

          {/* Desktop Right Section - Action Icons, Counter & Buy Button */}
          <div
            className={cn(
              "flex flex-col justify-between items-end",
              isClient && isTablet ? "hidden" : "flex",
              isClient && !isTablet ? "min-w-[160px] xl:min-w-[180px]" : ""
            )}
          >
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
                onClick={() => setShowQuickView(true)}
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
                className="max-w-64 w-full whitespace-nowrap h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF9B07] to-[#F08C00] text-white rounded-lg hover:from-[#F08C00] hover:to-[#E07B00] transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 p-4"
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
