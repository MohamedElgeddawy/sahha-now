import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/mock-data";
import Link from "next/link";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      prefetch
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg border border-gray-100 p-4"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-medium z-10">
            -{product.discount}%
          </div>
        )}
        <Image
          src={product.images[0]}
          alt={product.arabicTitle}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="mt-4 space-y-2">
        {/* Category */}
        <div className="text-xs text-gray-500">{product.category}</div>

        {/* Title */}
        <h3 className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
          {product.arabicTitle}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", {
                  "text-[#FFA726] fill-[#FFA726]": i < product.rating,
                  "text-gray-300 fill-gray-300": i >= product.rating,
                })}
              />
            ))}
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-900">{product.price}</span>
            <span className="text-sm text-gray-600">ر.س</span>
          </div>
          {product.originalPrice > product.price && (
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
              <span className="text-sm text-gray-400">ر.س</span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full py-2 text-center bg-[#FF9B07] text-white rounded-lg hover:bg-[#F08C00] transition-colors">
          اشتري الآن
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
