"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck, Zap, Gift, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product, ProductVariant } from "@/lib/api/products";
import Image from "next/image";
import QuantityCounter from "../ui/QuantityCounter";
import { VariantSelector } from "../ui/VariantSelector";
import { useCart } from "@/lib/hooks/use-cart";

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
  const [questionForm, setQuestionForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Set default variant on component mount
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const defaultVariant =
        product.variants.find((v) => v.isDefault) || product.variants[0];
      setSelectedVariant(defaultVariant);
    }
  }, [product.variants]);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Question submitted:", questionForm);
    setShowQuestionForm(false);
  };

  // Calculate current price based on selected variant or product
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentDiscount = selectedVariant
    ? selectedVariant.discount
    : product.discount;
  const finalPrice =
    Number(currentDiscount) > 0
      ? Number(currentPrice) -
        Number(currentPrice) * (Number(currentDiscount) / 100)
      : Number(currentPrice);

  return (
    <div className="space-y-6">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">{product.arabicName}</h1>
          <div className="text-sm text-gray-500">
            رقم المنتج: ({selectedVariant?.sku || product.id})
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
            رقم المنتج: ({selectedVariant?.sku || product.id})
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
            <span className="text-gray-900">{product.brand?.arabicName}</span>
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
          {Number(currentDiscount) > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-base text-gray-400 line-through">
                {currentPrice}
              </span>
              <span className="text-sm text-gray-400">ر.س</span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2 bg-[#F2FBF6] rounded-lg px-3 py-1">
          <Gift className="w-6 h-5 text-green-primary " />
          <span className="text-green-primary text-sm">20 نقطة</span>
        </div>
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
      <div className="flex items-center gap-4">
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
          className="flex-1 bg-[#FF9B07] text-white hover:bg-[#F08C00]"
          disabled={
            addToCart.isPending ||
            (selectedVariant ? !selectedVariant.isAvailable : false)
          }
        >
          {addToCart.isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
              جاري الإضافة...
            </span>
          ) : (
            `اضف لعربة التسوق - ${(finalPrice * quantity).toFixed(2)} ر.س`
          )}
        </Button>
      </div>

      {/* Free Shipping and Ask Question Section (Mobile Layout) */}
      <div className="md:hidden flex items-center justify-between gap-2 p-1">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Truck className="size-4 -scale-x-100" />
          <span>توصيل مجاني للطلبات فوق 375 ر س</span>
        </div>

        <button
          onClick={() => setShowQuestionForm(!showQuestionForm)}
          className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-gray-800"
        >
          <MessageSquare className="size-4" />
          <span>ترغب فى طرح سؤال؟</span>
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

      {/* Modal Popup for Question Form */}
      {showQuestionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-lg p-8 flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={() => setShowQuestionForm(false)}
              className="absolute left-6 top-6 text-gray-500 hover:text-gray-700 text-3xl focus:outline-none"
              aria-label="إغلاق"
            >
              &times;
            </button>
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              ترغب فى طرح سؤال؟
            </h2>
            <form
              onSubmit={handleQuestionSubmit}
              className="w-full max-w-md space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  value={questionForm.name}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ادخل اسمك"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={questionForm.phone}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ادخل رقم هاتفك"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  value={questionForm.email}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ادخل بريدك الإلكتروني"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  السؤال
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={questionForm.message}
                  onChange={(e) =>
                    setQuestionForm({
                      ...questionForm,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="اكتب سؤالك هنا..."
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 py-3"
              >
                إرسال السؤال
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
