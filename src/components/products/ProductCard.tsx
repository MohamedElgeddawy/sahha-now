import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/api/products";
import Link from "next/link";

type Props = {
  product: Partial<Product>;
  isLoading?: boolean;
};

const ProductCard = ({ product, isLoading = false }: Props) => {
  // Render skeleton UI when loading
  if (isLoading) {
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
  }

  // Return early if product is missing required data
  // if (!product.id || !product.name || !product.media) {
  //   return null;
  // }

  return (
    <Link
      prefetch
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg border border-gray-100 p-4"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
        {/* Discount Badge */}
        {product.discount && parseInt(product.discount) > 0 && (
          <div className="absolute top-2 right-2 bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-medium z-10">
            -{product.discount}%
          </div>
        )}
        <Image
          src={product?.media?.[0]?.thumbnailUrl || ""}
          alt={product?.name || ""}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="mt-4 space-y-2">
        {/* Title */}
        <h3 className="text-gray-600 line-clamp-2 font-semibold text-lg">
          {product.name}
        </h3>

        <div className="text-xs text-gray-500">{product.category?.name}</div>

        {/* Price */}
        <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-400 line-through">
                {product?.price}
              </span>
              <span className="text-sm text-gray-400">ر.س</span>
            </div>
          ) : null}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
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
