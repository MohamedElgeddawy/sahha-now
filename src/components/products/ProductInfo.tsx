"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck, Zap, Gift, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/api/products";
import Image from "next/image";
import QuantityCounter from "../ui/QuantityCounter";
import { useCart } from "@/lib/hooks/use-cart";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Question submitted:", questionForm);
    setShowQuestionForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl  text-gray-900">{product.arabicName}</h1>
        <div className="text-sm text-gray-500">رقم المنتج: ({product.id})</div>
      </div>
      {/* Rating and Stock */}
      <div className="flex items-center justify-between">
        {/* Brand Label */}
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
        <span className="text-sm text-green-600 font-medium">متوفر</span>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Zap className="size-4 text-yellow-500 fill-yellow-500" />
          <span>تم البيع 18 مرة خلال اليوم</span>
        </div>
      </div>
      {/* Divider */}
      <div className="h-[1px] w-full bg-[#E0E0E0]" />
      {/* Price */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              {Number(product.discount) > 0
                ? Number(product.price) -
                  Number(product.price) * (Number(product.discount) / 100)
                : product.price}
            </span>
            <span className="text-sm font-medium text-green-600">ر.س</span>
          </div>
          {Number(product.discount) > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-base text-gray-400 line-through">
                {product.price}
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

      {/* shortDescription */}
      <p className="text-gray-600">{product.shortDescription}</p>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-4">
        <QuantityCounter
          initialValue={quantity}
          onChange={(value) => setQuantity((prev) => prev + value)}
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
            `اضف لعربة التسوق - ${(Number(product.price) || 0) * quantity} ر.س`
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between ">
        {/* Free Shipping */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <Truck className="h-5 w-5 -scale-x-100" />
          <div>
            <span>توصيل مجاني </span>
            <span className="text-sm text-gray-400">للطلبات فوق 375 ر س</span>
          </div>
        </div>

        {/* Ask Question Section */}
        <div className="space-y-4">
          <button
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-800"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">ترغب فى طرح سؤال؟</span>
          </button>
        </div>
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
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col col-span-1 md:col-span-1">
                <label className="block text-base font-medium text-gray-600 mb-2">
                  الاسم*
                </label>
                <input
                  type="text"
                  required
                  value={questionForm.name}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, name: e.target.value })
                  }
                  placeholder="يرجاء إدخال الاسم"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#2D9CDB] focus:border-[#2D9CDB] text-right text-lg"
                />
              </div>
              <div className="flex flex-col col-span-1 md:col-span-1">
                <label className="block text-base font-medium text-gray-600 mb-2">
                  البريد الإلكتروني*
                </label>
                <input
                  type="email"
                  required
                  value={questionForm.email}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, email: e.target.value })
                  }
                  placeholder="يرجاء إدخال البريد الإلكتروني"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#2D9CDB] focus:border-[#2D9CDB] text-right text-lg"
                />
              </div>
              <div className="flex flex-col col-span-1 md:col-span-2">
                <label className="block text-base font-medium text-gray-600 mb-2">
                  رقم هاتف
                </label>
                <input
                  type="tel"
                  value={questionForm.phone}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, phone: e.target.value })
                  }
                  placeholder="يرجاء إدخال رقم هاتفك"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#2D9CDB] focus:border-[#2D9CDB] text-right text-lg"
                />
              </div>
              <div className="flex flex-col col-span-1 md:col-span-2">
                <label className="block text-base font-medium text-gray-600 mb-2">
                  الرسالة
                </label>
                <textarea
                  value={questionForm.message}
                  onChange={(e) =>
                    setQuestionForm({
                      ...questionForm,
                      message: e.target.value,
                    })
                  }
                  placeholder="يرجاء إدخال رسالتك"
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#2D9CDB] focus:border-[#2D9CDB] text-right text-lg"
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                <Button
                  type="submit"
                  className="bg-[#27AE60] hover:bg-[#219653] w-40 h-12 text-lg"
                >
                  إرسال
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
