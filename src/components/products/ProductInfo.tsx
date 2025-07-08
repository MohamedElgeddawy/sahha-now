"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck, Zap, Gift, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Product, ProductVariant } from "@/lib/api/products";
import Image from "next/image";
import QuantityCounter from "../ui/QuantityCounter";
import { VariantSelector } from "../ui/VariantSelector";
import { useCart } from "@/lib/hooks/use-cart";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/api/contactUs";

interface ProductInfoProps {
  product: Product;
}

const questionFormSchema = z.object({
  name: z.string().min(1, { message: "هذا الحقل مطلوب" }),
  email: z
    .string()
    .min(1, { message: "هذا الحقل مطلوب" })
    .email({ message: "بريد إلكتروني غير صالح" }),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^\d{8,15}$/.test(val), {
      message: "رقم هاتف غير صالح",
    }),
  message: z
    .string()
    .min(1, { message: "هذا الحقل مطلوب" })
    .min(10, { message: "يجب أن تكون الرسالة على الأقل 10 أحرف" }),
});

type QuestionFormData = z.infer<typeof questionFormSchema>;

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const { addToCart } = useCart();
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  // Set default variant on component mount
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const defaultVariant =
        product.variants.find((v) => v.isDefault) || product.variants[0];
      setSelectedVariant(defaultVariant);
    }
  }, [product.variants]);

  const handleQuestionSubmit = async (data: QuestionFormData) => {
    try {
      await sendContactMessage(data);
      setShowQuestionForm(false);
      reset();
      toast.success("تم إرسال رسالتك بنجاح");
    } catch (error: any) {
      toast.error(error?.message || "حدث خطأ أثناء إرسال الرسالة");
    }
  };

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
              {product.giftPoints} نقطة
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
      <div className="flex items-center justify-between gap-2 p-1">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Truck className="size-4 -scale-x-100" />
          <span>
            توصيل مجاني
            <span className="text-gray-400"> للطلبات فوق 375 ر.س</span>
          </span>
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
      <AnimatePresence>
        {showQuestionForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end bg-black/40 backdrop-blur-sm md:items-center md:justify-center"
            onClick={() => setShowQuestionForm(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-6 pb-8 shadow-lg md:max-w-2xl md:rounded-2xl md:p-8"
            >
              {/* Mobile Handle */}
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300 md:hidden" />

              {/* Close Button (Desktop) */}
              <button
                onClick={() => setShowQuestionForm(false)}
                className="absolute right-6 top-6 hidden text-3xl text-gray-500 hover:text-gray-700 focus:outline-none md:block"
                aria-label="إغلاق"
              >
                &times;
              </button>

              {/* Title */}
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 md:text-3xl">
                ترغب فى طرح سؤال؟
              </h2>

              <form
                onSubmit={handleSubmit(handleQuestionSubmit)}
                className="mx-auto w-full max-w-lg space-y-4 text-right"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      الاسم<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="برجاء إدخال الاسم"
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      البريد الإلكتروني<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="برجاء إدخال البريد الإلكتروني"
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    رقم هاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="برجاء إدخال رقم هاتفك"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="برجاء إدخال رسالتك"
                    required
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-green-500 py-3 text-lg text-white hover:bg-green-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري الإرسال...
                    </span>
                  ) : (
                    "إرسال"
                  )}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
