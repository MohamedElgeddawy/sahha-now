import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/mock-data";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="relative flex flex-col h-full bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium z-10">
          -{product.discount}%
        </div>
      )}
      <div className="relative h-48 w-full bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="font-medium truncate text-gray-900 mb-1">
          {product.arabicTitle}
        </p>
        <span className="text-sm text-gray-400 mb-2">{product.category}</span>

        <div className="flex items-center mt-auto mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-x-1">
              <span className="font-bold text-green-600">
                {product.price.toFixed(2)}
              </span>
              <span className="font-bold text-green-600 text-sm">ر س</span>
            </div>
            {product.originalPrice > product.price && (
              <del className="text-xs text-gray-400">
                <span>{product.originalPrice.toFixed(2)}</span>
                <span>ر س</span>
              </del>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-x-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={cn("size-5", {
                    "text-yellow-400 fill-yellow-400": i < product.rating,
                    "text-gray-300 fill-gray-300": i >= product.rating,
                  })}
                />
              ))}
          </div>
          <span className="text-sm text-gray-500">{product.reviewCount}</span>
        </div>
      </div>

      <Button className="mx-4 mb-4 mt-0 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm h-9">
        اشترِ الآن
      </Button>
    </div>
  );
};

export default ProductCard;
