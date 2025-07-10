"use client";

import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";
import { Star, Truck, Zap, Gift, MessageSquare } from "lucide-react";
import { cn } from "@utils";
import { Product, ProductVariant } from "@api/products";
import Image from "next/image";
import QuantityCounter from "@components/ui/QuantityCounter";
import { VariantSelector } from "@components/ui/VariantSelector";
import { useCart } from "@hooks/use-cart";
import Link from "next/link";
import { QuestionFormDialog } from "./QuestionFormDialog";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const { addToCart } = useCart();
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  // Set default variant on component mount
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const defaultVariant =
        product.variants.find((v) => v.isDefault) || product.variants[0];
      setSelectedVariant(defaultVariant);
    }
  }, [product.variants]);

  // Calculate current price based on selected variant or product
  const price = Number(selectedVariant?.price ?? product.price);
  const discountValue = selectedVariant?.discount ?? product.discount;
  const discount = Number(discountValue) || 0;

  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price - price * (discount / 100) : price;

  return (
    <div className="space-y-6">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">{product.arabicName}</h1>
          <div className="text-sm text-gray-500">
            رقم المنتج: ({selectedVariant?.sku})
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">العلامة التجارية:</span>
            <span className="text-sm text-gray-900">
              {product.brand?.arabicName}
            </span>
          </div>

          <div className="flex items-center gap-1">
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
            <span className="text-sm text-gray-500">
              ({product?._count?.reviews || 0})
            </span>
          </div>

          <span
            className={cn("text-sm font-medium", {
              "text-green-600": !selectedVariant || selectedVariant.isAvailable,
              "text-red-600": selectedVariant && !selectedVariant.isAvailable,
            })}
          >
            {!selectedVariant || selectedVariant.isAvailable
              ? "متوفر"
              : "غير متوفر"}
          </span>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Zap className="size-4 text-yellow-500 fill-yellow-500" />
            <span>تم البيع 18 مرة خلال اليوم</span>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        <h1 className="text-xl font-bold text-gray-900">
          {product.arabicName}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-gray-500">
            رقم المنتج: ({selectedVariant?.sku})
          </div>

          <div className="flex items-center gap-1">
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
            <span className="text-sm text-gray-500">
              ({product?._count?.reviews || 0})
            </span>
          </div>

          <span
            className={cn("text-sm font-medium", {
              "text-green-600": !selectedVariant || selectedVariant.isAvailable,
              "text-red-600": selectedVariant && !selectedVariant.isAvailable,
            })}
          >
            {!selectedVariant || selectedVariant.isAvailable
              ? "متوفر"
              : "غير متوفر"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>العلامة التجارية:</span>
            <Link
              href={`/products?brandIds=${product.brand?.id}`}
              className="text-gray-900 hover:underline"
            >
              {product.brand?.arabicName}
            </Link>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Zap className="size-4 text-yellow-500 fill-yellow-500" />
            <span>تم البيع 18 مرة خلال اليوم</span>
          </div>
        </div>
      </div>

      {/* Common Elements (Divider, Price, etc.) */}
      <div className="h-[1px] w-full bg-[#E0E0E0]" />

      {/* Price section (same for both) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              {finalPrice.toFixed(2)}
            </span>
            <span className="text-sm font-medium text-green-600">ر.س</span>
          </div>
          {hasDiscount ? (
            <div className="flex items-center gap-1">
              <span className="text-base text-gray-400 line-through">
                {price.toFixed(2)}
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

      {/* arabicShortDescription */}
      <p className="text-gray-600">{product.arabicShortDescription}</p>

      {/* Product Variants */}
      {product.variants && product.variants.length > 0 && (
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant}
          onVariantSelect={setSelectedVariant}
        />
      )}

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-2 md:gap-4">
        <QuantityCounter
          initialValue={quantity}
          onChange={(value) => setQuantity((prev) => prev + value)}
        />
        <Button
          onClick={() => {
            addToCart.mutate({
              product,
              quantity,
              variantId: selectedVariant?.id,
            });
            setQuantity(1);
          }}
          className="flex-1 px-2 text-sm md:text-base bg-[#FF9B07] text-white hover:bg-[#F08C00]"
          disabled={
            addToCart.isPending ||
            (selectedVariant ? !selectedVariant.isAvailable : false)
          }
        >
          {addToCart.isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              جاري الإضافة...
            </span>
          ) : (
            `اضف لعربة التسوق - ${(finalPrice * quantity).toFixed(2)} ر.س`
          )}
        </Button>
      </div>

      {/* Free Shipping and Ask Question Section (Mobile Layout) */}
      <div className="flex items-center justify-between gap-2 p-1">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Truck className="size-4 -scale-x-100" />
          <span>
             توصيل مجاني
            <span className="text-xs md:text-base gap-2 text-gray-400">
              للطلبات فوق 375 ر.س
            </span>
          </span>
        </div>

        <button
          onClick={() => setShowQuestionForm(true)}
          className="cursor-pointer hover:underline flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-gray-800"
        >
          <MessageSquare className="size-4" />
          <span className="p-0">ترغب فى طرح سؤال؟</span>
        </button>
      </div>

      {/* Divider after Question Section */}
      <div className="h-[1px] w-full bg-[#E0E0E0]" />

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">طرق دفع آمنة</span>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/payment/VISA.svg"
              alt="VISA"
              width={40}
              height={24}
            />
            <Image
              src="/icons/payment/MASTERCARD.svg"
              alt="MASTERCARD"
              width={40}
              height={24}
            />
            <Image
              src="/icons/payment/MADA.svg"
              alt="MADA"
              width={40}
              height={24}
            />
          </div>
        </div>
      </div>

      {/* Question Form Dialog */}
      <QuestionFormDialog
        isOpen={showQuestionForm}
        onOpenChange={setShowQuestionForm}
      />
    </div>
  );
}
