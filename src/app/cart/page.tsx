"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/hooks/use-cart";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import QuantityCounter from "@/components/ui/QuantityCounter";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Switch } from "@/components/ui/switch";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import ProductCarousel from "@/components/products/ProductCarousel";
import { useFeaturedProducts } from "@/lib/hooks/use-products";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";

export default function CartPage() {
  const {
    items,
    subtotal,
    removeFromCart,
    updateItemQuantity,
    isLoading,
    error,
    refetchCart,
  } = useCart();
  const [usePoints, setUsePoints] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const { data: otherProducts, isLoading: otherProductsLoading } =
    useFeaturedProducts();

  // Fetch cart data when component mounts
  useEffect(() => {
    refetchCart();
  }, [refetchCart]);

  // Calculate service fee (example: 4% of subtotal)
  const serviceFee = useMemo(() => subtotal * 0.04, [subtotal]);
  // Rounded to 2 decimal places
  const serviceFeeFormatted = useMemo(
    () => Math.round(serviceFee * 100) / 100,
    [serviceFee]
  );

  // Calculate total
  const total = useMemo(
    () => subtotal + serviceFeeFormatted,
    [subtotal, serviceFeeFormatted]
  );

  // Format currency
  const formatCurrency = useCallback((amount: number) => {
    return `${amount.toFixed(2)} ر.س`;
  }, []);

  // Handle quantity update
  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart.mutate({ itemId, quantity: 1 });
      return;
    }
    updateItemQuantity.mutate(
      { itemId, quantity },
      {
        onError: () => toast.error("حدث خطأ أثناء تحديث الكمية"),
      }
    );
  };
  const debouncedUpdateQuantity = useDebounceCallback(
    (itemId: string, quantity: number) => {
      handleQuantityChange(itemId, quantity);
    },
    500
  );

  // Handle remove item
  const handleRemoveItem = (itemId: string, quantity?: number) => {
    removeFromCart.mutate(
      { itemId, quantity: quantity || 1 },
      {
        onError: () => toast.error("حدث خطأ أثناء إزالة المنتج من السلة"),
      }
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-48 w-48 bg-gray-200 rounded-full mb-6"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="py-12 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">حدث خطأ</h2>
        <p className="text-gray-500 mb-8 max-w-md">{error}</p>
        <Button onClick={() => refetchCart()}>إعادة المحاولة</Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center text-center">
        <Image
          src="/images/emptyCart.svg"
          alt="سلة فارغة"
          width={250}
          height={250}
          className="mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك حتى الآن
        </p>
        <Button asChild>
          <Link href="/products">تصفح المنتجات</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المتجر", href: "/products" },
          { label: "عربة التسوق", href: "/cart" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Takes 2/3 of the space on larger screens */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-5 gap-4 font-semibold pb-2 mb-4">
              <div className="col-span-2 text-start">المنتج</div>
              <div className="text-center">السعر</div>
              <div className="text-center">الكمية</div>
              <div className="text-center">المجموع</div>
            </div>

            <AnimatePresence>
              {items.map((item) => {
                const finalPrice =
                  parseFloat(item.product.price) *
                  (1 - parseFloat(item.product.discount || "0") / 100);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-5 gap-4 items-center py-4 border-b border-gray-300 last:border-0"
                  >
                    {/* Product image and info */}
                    <div className="flex items-center gap-3 col-span-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={removeFromCart.isPending}
                        className="rounded-full text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveItem(item.id, item.quantity)}
                      >
                        <X className="h-5 w-5" />
                      </Button>

                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image
                          src={
                            item.product.media[0]?.url || "/images/product.jpg"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="text-right">
                        <h3 className="font-semibold text-sm line-clamp-2">
                          {item.product.name}
                        </h3>
                        {item.variant && (
                          <span className="text-xs text-gray-500">
                            {item.variant.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <div className="font-semibold">
                        {formatCurrency(finalPrice)}
                      </div>
                      {parseFloat(item.product.discount || "0") > 0 && (
                        <span className="text-xs text-gray-500 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-gray-500">
                          {formatCurrency(parseFloat(item.product.price))}
                        </span>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex justify-center">
                      <QuantityCounter
                        initialValue={item.quantity}
                        onChange={(value) =>
                          debouncedUpdateQuantity(item.id, value)
                        }
                        size="md"
                      />
                    </div>

                    {/* Total */}
                    <div className="text-center">
                      <div className="font-semibold">
                        {formatCurrency(finalPrice * item.quantity)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/products" prefetch>
                متابعة التسوق
                <ChevronRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Cart Summary - Takes 1/3 of the space on larger screens */}
        <div className="space-y-4">
          <div className="bg-[#F6F6F6] rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-right">
              إجمالي عربة التسوق
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">خدمة</span>
                <span className="font-semibold">
                  {formatCurrency(serviceFeeFormatted)}
                </span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between items-center text-lg font-bold">
                <span>الإجمالي</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Discount Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="الرجاء إدخال كود الخصم"
                  className="h-12"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button>تطبيق الخصم</Button>
              </div>
            </div>

            {/* Use Points Toggle */}
            <label className="flex items-center justify-between gap-2 mb-6">
              <span>استخدم حساب محفظتك</span>
              <Switch
                className="bg-amber-400"
                checked={usePoints}
                onCheckedChange={setUsePoints}
              />
            </label>

            <Button asChild className="w-full text-white">
              <Link href="/checkout" prefetch>
                الدفع الآن
              </Link>
            </Button>

            <div className="mt-6 flex flex-col gap-2 items-center">
              <h3 className="text-sm font-semibold">طرق دفع آمنة</h3>
              <div className="flex gap-2 justify-center *:shadow">
                <Image
                  src="/icons/payment/MADA.svg"
                  alt="MADA"
                  width={40}
                  height={24}
                />
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <ProductCarousel
          title="اكتشف منتجات أخرى قد تهمك"
          products={otherProducts?.products || []}
          isLoading={otherProductsLoading}
        />
      </div>
    </>
  );
}
