"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Separator } from "@components/ui/separator";
import { useCart } from "@hooks/use-cart";
import Image from "next/image";
import { ChevronRight, Truck, X } from "lucide-react";
import QuantityCounter from "@components/ui/QuantityCounter";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Switch } from "@components/ui/switch";
import { Breadcrumb } from "@components/layout/Breadcrumb";
import ProductCarousel from "@components/products/ProductCarousel";
import { useFeaturedProducts } from "@hooks/use-products";
import Loader from "@app/loading";

const FREE_DELIVERY_THRESHOLD = 375;

export function FreeDeliveryBar({ total }: { total: number }) {
  const amountLeft = Math.max(0, FREE_DELIVERY_THRESHOLD - total);
  const progress = Math.min((total / FREE_DELIVERY_THRESHOLD) * 100, 100);

  return (
    <div
      style={{
        border: "1px solid #ff9800",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "24px",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "6px",
          background: "#eee",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#ff9800",
            borderRadius: "4px",
            transition: "width 0.3s",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: `${progress - 8}%`,
            top: "-16px",
            transform: "translateX(-50%)",
            color: "#263238",
          }}
        >
          
          <Truck className="size-4 -scale-x-100" />

        </span>
      </div>
      <div style={{ textAlign: "center", color: "#263238", fontWeight: 300 }}>
        {total >= FREE_DELIVERY_THRESHOLD ? (
          <span style={{ color: "#43a047" }}>🎉 لقد حصلت على شحن مجاني!</span>
        ) : (
          <>
            أضف{" "}
            <span style={{ fontWeight: 700 }}>{amountLeft.toFixed(2)} ر.س</span>{" "}
            أكثر للحصول على <span style={{ fontWeight: 700 }}>شحن مجاني!</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();
  const { cartItems, totalPrice } = cart.data || {
    cartItems: [],
    totalPrice: 0,
  };
  const [usePoints, setUsePoints] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const { data: otherProducts, isLoading: otherProductsLoading } =
    useFeaturedProducts();

  // Calculate service fee (example: 4% of subtotal)
  const serviceFee = useMemo(() => parseFloat(totalPrice) * 0.04, [totalPrice]);
  // Rounded to 2 decimal places
  const serviceFeeFormatted = useMemo(
    () => Math.round(serviceFee * 100) / 100,
    [serviceFee]
  );

  // Format currency
  const formatCurrency = useCallback((amount: number) => {
    return `${amount.toFixed(2)} ر.س`;
  }, []);

  // Handle quantity update
  const handleQuantityChange = (variantId: string, quantity: number) => {
    if (quantity < 0) {
      removeFromCart.mutate({ variantId, quantity: 1 });
    } else {
      addToCart.mutate({ variantId, quantity });
    }
  };

  // Show loading state
  if (cart.isLoading) {
    return <Loader />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-12 px-4 flex flex-col items-center text-center">
        <Image
          src="/images/emptyCart.svg"
          alt="سلة فارغة"
          width={250}
          height={250}
          className="mb-6 max-w-full h-auto"
        />
        <h2 className="text-xl md:text-2xl font-bold mb-4">سلة التسوق فارغة</h2>
        <p className="text-gray-500 mb-8 max-w-md text-sm md:text-base">
          لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك حتى الآن
        </p>
        <Button asChild className="w-full max-w-xs">
          <Link href="/products">تصفح المنتجات</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المتجر", href: "/products" },
          { label: "عربة التسوق" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items - Takes 2/3 of the space on larger screens */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg p-4 md:p-6">
            {/* Desktop Table Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-5 gap-4 font-semibold pb-2 mb-4 border-b">
              <div className="col-span-2 text-start">المنتج</div>
              <div className="text-center">السعر</div>
              <div className="text-center">الكمية</div>
              <div className="text-center">المجموع</div>
            </div>

            <AnimatePresence>
              {cart.data?.cartItems.map((item) => {
                const finalPrice =
                  parseFloat(item.variant.price) *
                  (1 - parseFloat(item.variant.product.discount || "0") / 100);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200 last:border-0 py-4"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                      {/* Product image and info */}
                      <div className="flex items-center gap-3 col-span-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={removeFromCart.isPending}
                          className="rounded-full text-gray-400 hover:text-red-500 flex-shrink-0"
                          onClick={() =>
                            removeFromCart.mutate({
                              variantId: item.variant.id,
                              quantity: item.quantity,
                            })
                          }
                        >
                          <X className="size-5" />
                        </Button>

                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              item.variant.product.media[0]?.thumbnailUrl ||
                              "/images/product.jpg"
                            }
                            alt={
                              item.variant.product.arabicName ||
                              item.variant.product.name
                            }
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="text-right min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {item.variant.product.arabicName ||
                              item.variant.product.name}
                          </h3>
                          {item.variant && (
                            <span className="text-xs text-gray-500">
                              {item.variant.arabicName || item.variant.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center">
                        <div className="font-semibold text-sm">
                          {formatCurrency(finalPrice)}
                        </div>
                        {parseFloat(item.variant.product.discount || "0") >
                          0 && (
                          <span className="text-xs text-gray-500 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-gray-500">
                            {formatCurrency(parseFloat(item.variant.price))}
                          </span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex justify-center">
                        <QuantityCounter
                          initialValue={item.quantity}
                          onChange={(value) => {
                            handleQuantityChange(item.variant.id, value);
                          }}
                          size="md"
                        />
                      </div>

                      {/* Total */}
                      <div className="text-center">
                        <div className="font-semibold text-sm">
                          {formatCurrency(finalPrice * item.quantity)}
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              item.variant.product.media[0]?.thumbnailUrl ||
                              "/images/product.jpg"
                            }
                            alt={
                              item.variant.product.arabicName ||
                              item.variant.product.name
                            }
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col min-w-0">
                          {/* Top: Title and Remove button */}
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1 text-right">
                              <h3 className="font-semibold text-sm line-clamp-2">
                                {item.variant.product.arabicName ||
                                  item.variant.product.name}
                              </h3>
                              {item.variant && (
                                <span className="text-xs text-gray-500">
                                  {item.variant.arabicName || item.variant.name}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={removeFromCart.isPending}
                              className="rounded-full text-gray-400 hover:text-red-500 flex-shrink-0 w-8 h-8 -mr-2"
                              onClick={() =>
                                removeFromCart.mutate({
                                  variantId: item.variant.id,
                                  quantity: item.quantity,
                                })
                              }
                            >
                              <X className="size-5 md:size-8 text-gray-600" />
                            </Button>
                          </div>

                          {/* Spacer to push bottom content down */}
                          <div className="flex-grow"></div>

                          {/* Bottom: Price and Quantity */}
                          <div className="flex justify-between items-center mt-2">
                            {/* Price */}
                            <div>
                              <div className="font-semibold text-sm">
                                {formatCurrency(finalPrice)}
                              </div>
                              {parseFloat(
                                item.variant.product.discount || "0"
                              ) > 0 && (
                                <span className="text-xs text-gray-500 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-gray-500">
                                  {formatCurrency(
                                    parseFloat(item.variant.price)
                                  )}
                                </span>
                              )}
                            </div>
                            {/* Quantity */}
                            <QuantityCounter
                              initialValue={item.quantity}
                              onChange={(value) => {
                                handleQuantityChange(item.variant.id, value);
                              }}
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="gap-2 w-full sm:w-auto"
            >
              <Link href="/products" prefetch>
                متابعة التسوق
                <ChevronRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Cart Summary - Takes 1/3 of the space on larger screens */}
        <div className="space-y-4">
          <div className="bg-[#F6F6F6] rounded-lg p-4 md:p-6 shadow-sm sticky top-4">
            <FreeDeliveryBar total={parseFloat(cart.data?.totalPrice || "0")} />
            <h2 className="text-lg font-bold mb-4 text-right">
              إجمالي عربة التسوق
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">
                  المجموع الفرعي
                </span>
                <span className="font-semibold text-sm md:text-base">
                  {formatCurrency(parseFloat(totalPrice))}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">خدمة</span>
                <span className="font-semibold text-sm md:text-base">
                  {formatCurrency(serviceFeeFormatted)}
                </span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between items-center text-base md:text-lg font-bold">
                <span>الإجمالي</span>
                <span>
                  {formatCurrency(parseFloat(totalPrice) + serviceFeeFormatted)}
                </span>
              </div>
            </div>

            {/* Discount Code */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="الرجاء إدخال كود الخصم"
                  className="h-10 md:h-12 text-sm"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button className="w-full sm:w-auto text-sm">
                  تطبيق الخصم
                </Button>
              </div>
            </div>

            {/* Use Points Toggle */}
            <label className="flex items-center justify-between gap-2 mb-6 cursor-pointer">
              <span className="text-sm md:text-base">استخدم حساب محفظتك</span>
              <Switch
                className="bg-amber-400"
                checked={usePoints}
                onCheckedChange={setUsePoints}
              />
            </label>

            <Button asChild className="w-full text-white h-10 md:h-12">
              <Link href="/checkout" prefetch>
                الدفع الآن
              </Link>
            </Button>

            <div className="mt-6 flex flex-col gap-2 items-center">
              <h3 className="text-xs md:text-sm font-semibold">طرق دفع آمنة</h3>
              <div className="flex gap-2 justify-center *:shadow">
                <Image
                  src="/icons/payment/MADA.svg"
                  alt="MADA"
                  width={32}
                  height={20}
                  className="md:w-10 md:h-6"
                />
                <Image
                  src="/icons/payment/VISA.svg"
                  alt="VISA"
                  width={32}
                  height={20}
                  className="md:w-10 md:h-6"
                />
                <Image
                  src="/icons/payment/MASTERCARD.svg"
                  alt="MASTERCARD"
                  width={32}
                  height={20}
                  className="md:w-10 md:h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <ProductCarousel
          title="اكتشف منتجات أخرى قد تهمك"
          products={otherProducts?.products || []}
          isLoading={otherProductsLoading}
        />
      </div>
    </div>
  );
}
