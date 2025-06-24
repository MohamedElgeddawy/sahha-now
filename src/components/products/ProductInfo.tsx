"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck, Info, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/api/products";
import Image from "next/image";
import QuantityCounter from "../ui/QuantityCounter";
import { toast } from "sonner";
import { useCart } from "@/lib/hooks/use-cart";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart } = useCart();
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
        <h1 className="text-2xl  text-gray-900">{product.name}</h1>
        <div className="text-sm text-gray-500">رقم المنتج: ({product.id})</div>
      </div>
      {/* Rating and Stock */}
      <div className="flex items-center justify-between">
        {/* Brand Label */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">العلامة التجارية:</span>
          <span className="text-sm text-gray-900">{product.brand?.name}</span>
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
          <span>تم البيع 18 مرة خلال اليوم</span>
          <Info className="h-4 w-4" />
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
            <span className="text-sm font-medium  text-green-600">ر.س</span>
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
          <span className="text-[#27AE60] text-sm">20 نقطة</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13.3332 4L5.99984 11.3333L2.6665 8"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600">{product.description}</p>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-4">
        <QuantityCounter
          initialValue={quantity}
          onChange={(value) => setQuantity(value)}
        />
        <Button
          onClick={() => {
            addToCart.mutate({ product, variant: null, quantity });
            toast.success("تمت الإضافة إلى السلة");
            openCart();
            setQuantity(1);
          }}
          className="w-full bg-[#FF9B07] text-white hover:bg-[#F08C00]"
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
            <span>توصيل مجاني للطلبات أعلى من </span>
            <span className="font-medium">375 ر.س</span>
          </div>
        </div>

        {/* Ask Question Section */}
        <div className="space-y-4">
          <button
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            className="flex items-center gap-2 text-[#2D9CDB] hover:text-[#1E88C5] transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">ترغب فى طرح سؤال؟</span>
          </button>

          {showQuestionForm && (
            <form
              onSubmit={handleQuestionSubmit}
              className="space-y-4 bg-gray-50 p-4 rounded-lg"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2D9CDB] focus:border-[#2D9CDB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم هاتف
                </label>
                <input
                  type="tel"
                  value={questionForm.phone}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, phone: e.target.value })
                  }
                  placeholder="يرجاء إدخال رقم هاتفك"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2D9CDB] focus:border-[#2D9CDB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2D9CDB] focus:border-[#2D9CDB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2D9CDB] focus:border-[#2D9CDB]"
                />
              </div>

              <Button type="submit" className="bg-[#27AE60] hover:bg-[#219653]">
                إرسال
              </Button>
            </form>
          )}
        </div>
      </div>
      {/* Divider after Question Section */}
      <div className="h-[1px] w-full bg-[#E0E0E0]" />

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">طرق الدفع المتاحة</span>
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
    </div>
  );
}
