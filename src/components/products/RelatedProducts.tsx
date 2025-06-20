import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/api/products";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">
          اكتشف منتجات أخرى قد تهمك
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-full border border-gray-200 hover:bg-gray-50">
            <ChevronRight className="size-5 text-gray-600" />
          </button>
          <button className="p-1 rounded-full border border-gray-200 hover:bg-gray-50">
            <ChevronLeft className="size-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            prefetch
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="relative aspect-square rounded-lg bg-white border border-gray-100 overflow-hidden">
              {/* Discount Badge */}
              {product.discount && parseInt(product.discount) > 0 && (
                <div className="absolute top-2 right-2 bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium">
                  -{product.discount}%
                </div>
              )}
              <Image
                src={product.media[0]?.thumbnailUrl || ""}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="mt-3 space-y-2">
              <h3 className="text-sm text-gray-600 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-4 w-4", {
                        "text-yellow-400 fill-yellow-400":
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

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{product.price}</span>
                  <span className="text-sm">ر.س</span>
                </div>
                {product.price && product.price > (product.price || 0) && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.price} ر.س
                  </span>
                )}
              </div>

              <button className="w-full py-2 text-center bg-[#FF9B07] text-white rounded hover:bg-[#F08C00] transition-colors">
                أضف للسلة
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
