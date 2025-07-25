import { Product } from "@api/products";
import { Star, Zap, Loader2, Gift } from "lucide-react";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { useState } from "react";
import QuantityCounter from "@components/ui/QuantityCounter";
import { useCart } from "@hooks/use-cart";
import { cn } from "@utils";
import Link from "next/link";

interface ProductQuickViewProps {
  product: Product;
}

export default function ProductQuickView({ product }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  

  return (
    <div className=" bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-stretch gap-8">
      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center md:justify-end">
        <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-xl overflow-hidden border border-gray-100">
          <Image
            src={
              product.media?.find((img) => img.isMain)?.url ||
              product.media?.[0]?.url ||
              "/images/product.jpg"
            }
            alt={product.arabicName}
            fill
            className="object-contain p-4"
            priority
          />
        </div>
      </div>
      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-4 rtl:text-right">
        <h2 className="text-2xl font-bold text-gray-900">
          {product.arabicName}
        </h2>
        {/* First row: brand, stars, count, available (inline) */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>
            <span>العلامة التجارية:</span>
            <Link
              href={`/products?brandIds=${product.brand?.id}`}
              className="text-gray-900 hover:underline"
            >
              {product.brand?.arabicName}
            </Link>
          </span>
          <span className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={cn("size-4", {
                    "text-yellow-400 fill-yellow-400":
                      i < parseInt(product.averageRating),
                    "text-gray-300 fill-gray-300":
                      i >= parseInt(product.averageRating),
                  })}
                />
              ))}
            <span className="text-gray-500">
              ({product?._count?.reviews || 0})
            </span>
          </span>
          <span className="text-sm text-green-600 font-medium">متوفر</span>
        </div>
        {/* Divider */}
        <div className="h-[1px] w-full bg-[#E0E0E0] my-2" />
        {/* Second row: price, discount, points (inline) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              {Number(product.discount) > 0
                ? Number(product.price) -
                  Number(product.price) * (Number(product.discount) / 100)
                : product.price}
            </span>
            <span className="text-sm font-medium text-green-600">ر.س</span>
            {Number(product.discount) > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-base text-gray-400 line-through">
                {product.price}
              </span>
              <span className="text-sm text-gray-400">ر.س</span>
            </div>
          ) : null}
          </div>
          
          {product.giftPoints && product.giftPoints > 0 ? (
            <div className="flex items-center gap-2 bg-[#F2FBF6] rounded-lg px-3 py-1">
              <Gift className="w-6 h-5 text-green-primary " />
              <span className="text-green-primary text-sm">
                {product.giftPoints * quantity} نقطة
              </span>
            </div>
          ) : null}
        </div>
        {/* Third row: sales info */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Zap className="size-4 text-yellow-500 fill-yellow-500" />
          <span>تم البيع 18 مرة خلال اليوم</span>
        </div>
        {/* Fourth row: description */}
        <p className="text-gray-600 text-base mt-2 line-clamp-3">
          {product.arabicShortDescription}
        </p>
        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4 mt-4">
          <QuantityCounter
            initialValue={quantity}
            onChange={(value) =>
              setQuantity((prev) => (prev + value))
            }
          />
          <Button
            onClick={() => {
              addToCart.mutate({ product, quantity });
              setQuantity(1);
            }}
            className="flex-1 bg-[#FF9B07] text-white hover:bg-[#F08C00]"
            disabled={addToCart.isPending}
          >
            {addToCart.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
                جاري الإضافة...
              </span>
            ) : (
              `اضف لعربة التسوق - ${
                (Number(product.price) || 0) * quantity
              } ر.س`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
